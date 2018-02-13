import _ from 'lodash';
import {QUANTITY} from "../const/labels";

export const format = v => v < 10 ? Math.floor(v * 100) / 100 : Math.floor(v * 10) / 10;

export const trunkyAll = items => _.map(items, trunky);
export const trunky = trunk => ({_id: trunk._id, trunk});

const addAllSeeds = (trunk, tank) => {
    _.forEach(trunk.selection, seed => {
        if (_.isEmpty(seed.selection)) {
            let tankEntry = tank[seed._id] || {_id: seed._id, name: seed.name, qt: 0};
            tankEntry.qt += seed.qt;
            tank[seed._id] = tankEntry;
        } else {
            addAllSeeds(seed, tank);
        }
    });
    return tank;
};

const facetUnit = (tree, name) => {
    const facet = _.find(tree.facets, {name});
    if (facet) {
        return facet.unit;
    } else {
        return NaN;
    }
};

const facetQt = (tree, name) => {
    const facet = _.find(tree.facets, {name});
    if (facet) {
        return facet.qt;
    } else {
        return NaN;
    }
};

export const extraireAxisCoef = (name, leftTree, rightTree) => {
    let coef = null;
    let qt = null;
    let unit = null;

    const baseValueByAxis = {
        "Prix": tree => ({qt: tree.price, unit: "€"}),
        "Poids": tree => ({qt: tree.quantity.qt, unit: tree.quantity.unit})
    };

    if (baseValueByAxis[name]) {
        //c'est une base
        coef = baseValueByAxis[name](leftTree).qt / baseValueByAxis[name](rightTree).qt;
        qt = Math.max(baseValueByAxis[name](leftTree).qt, baseValueByAxis[name](rightTree).qt);
        unit = baseValueByAxis[name](leftTree).unit;
    } else {
        //c'est une facet
        coef = facetQt(leftTree, name) / facetQt(rightTree, name);
        qt = Math.max(facetQt(leftTree, name), facetQt(rightTree, name));
        unit = facetUnit(leftTree, name);
    }
    return {name, coef, qt, unit};
};


export const denormItem = ({name}, type, items) => _.map(items, item => ({
    tree: name,
    type,
    axis: item.name,
    qt: item.quantity.qt,
    unit: item.quantity.unit
}));

/**
 * tree =>
 * [
 {tree: "leftTreeName", type:"facet", axis: "Prix", qt:20, unit:"€"},
 {tree: "leftTreeName", type:"trunk", axis: "Quantité", qt:20, unit:"l"},
 {tree: "leftTreeName", type:"tank", axis: "Eau", qt:5, unit:"mol"},
 {tree: "leftTreeName", type:"tank", axis: "Elec", qt:12, unit:"mol"},
 ]
 * @param tree
 */
export const denorm = tree => ([
    ...denormItem(tree.trunk, "trunk", [{...tree.trunk, name: QUANTITY}]),
    ...denormItem(tree.trunk, "facet", tree.facets.items),
    ...denormItem(tree.trunk, "tank", tree.tank.items),
]);

export const align = (denorm, coef) => _.forEach(denorm, axis => axis.qt *= coef);

export const separate = (leftAxises, rightAxises) => {

    const leftWithoutQt = _.remove(leftAxises, axis => (_.isNil(axis.qt) || _.isNil(axis.unit)));
    const rightWithoutQt = _.remove(rightAxises, axis => (_.isNil(axis.qt) || _.isNil(axis.unit)));
    const leftWithoutRight = _.remove(leftAxises, axis => !_.find(rightAxises, {axis: axis.axis}));
    const rightWithoutLeft = _.remove(rightAxises, axis => !_.find(leftAxises, {axis: axis.axis}));

    return {
        left: [
            ...leftWithoutQt, ...leftWithoutRight
        ],
        common: {left: leftAxises, right: rightAxises},
        right: [
            ...rightWithoutQt, ...rightWithoutLeft
        ]
    };
};

/**
 *
 * @param leftTree, un arbre
 * @param rightTree, un arbre
 * @returns  let radarData = [
 [
 {tree: "leftTreeName", name: "Prix", coef: 1, qt:20, unit:"€"},
 {tree: "leftTreeName", name: "Quantité", coef: 1, qt:20, unit:"l"},
 {tree: "leftTreeName", name: "Lipides", coef: 1, qt:5, unit:"mol"},
 {tree: "leftTreeName", name: "Glucides", coef: 1, qt:12, unit:"mol"},
 ],
 [
 {tree: "rightTreeName", name: "Prix", coef: 0.22, qt:20, unit:"€"},
 {tree: "rightTreeName", name: "Quantité", coef: 1, qt:20, unit:"l"},
 {tree: "rightTreeName", name: "Lipides", coef: 0.5, qt:2.5, unit:"mol"},
 {tree: "rightTreeName", name: "Glucides", coef: 0, qt:0, unit:"mol"},
 ]
 ];
 */
export const toRadarData = ({leftTree, rightTree}) => {

    if (!leftTree || !rightTree || !leftTree.facets || !rightTree.facets) {
        console.warn("rendu de radar sans data", leftTree, rightTree);
        return;
    }

    const leftFacets = leftTree.facets.items;
    const rightFacets = rightTree.facets.items;

    const leftNames = _.map(leftFacets, 'name');
    const rightNames = _.map(rightFacets, 'name');

    //FACETS EN COMMUN
    const commonNames = _.intersection(leftNames, rightNames);
    const left = _.map(commonNames, name => ({
        name,
        coef: relativeTo1(_.find(leftFacets, {name}).qt, _.find(rightFacets, {name}).qt),
        qt: format(_.find(leftFacets, {name}).qt),
        unit: _.find(leftFacets, {name}).unit,
        axis: leftTree.name
    }));
    const right = _.map(commonNames, name => ({
        name,
        coef: relativeTo1(_.find(rightFacets, {name}).qt, _.find(leftFacets, {name}).qt),
        qt: format(_.find(rightFacets, {name}).qt),
        unit: _.find(rightFacets, {name}).unit,
        axis: rightTree.name
    }));

    //FACETS LEFT SEULEMENT
    const leftFacetsOnly = _.difference(leftNames, rightNames);
    _.forEach(leftFacetsOnly, name => {
        left.push({
            name,
            coef: 1,
            qt: format(_.find(leftFacets, {name}).qt),
            unit: _.find(leftFacets, {name}).unit,
            axis: leftTree.name
        });
        right.push({
            name,
            coef: 0,
            qt: 0,
            unit: _.find(leftFacets, {name}).unit,
            axis: rightTree.name,
        });
    });

    //FACETS RIGHT SEULEMENT
    const rightFacetsOnly = _.difference(rightNames, leftNames);
    _.forEach(rightFacetsOnly, name => {
        right.push({
            name,
            coef: 1,
            qt: format(_.find(rightFacets, {name}).qt),
            unit: _.find(rightFacets, {name}).unit,
            axis: rightTree.name,
        });
        left.push({
            name,
            coef: 0,
            qt: 0,
            unit: _.find(rightFacets, {name}).unit,
            axis: leftTree.name
        });
    });

    //TRUNK ALL
    const trunkAxis = {
        [QUANTITY]: tree => ({qt: tree.trunk.quantity.qt, unit: tree.trunk.quantity.unit})
    };
    _.forEach(trunkAxis, (valFct, name) => {
        left.push({
            name,
            coef: relativeTo1(valFct(leftTree).qt, valFct(rightTree).qt),
            qt: format(valFct(leftTree).qt),
            unit: valFct(leftTree).unit,
            axis: leftTree.name
        });
        right.push({
            name,
            coef: relativeTo1(valFct(rightTree).qt, valFct(leftTree).qt),
            qt: format(valFct(rightTree).qt),
            unit: valFct(rightTree).unit,
            axis: rightTree.name
        });
    });

    return {leftTree: left, rightTree: right};
};

const relativeTo1 = (first, second) => first > second ? 1 : format(first / second);
