import _ from 'lodash';
import {QUANTITY} from "../const/labels";
import {format} from "./calculations";

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

export const applyRatio = ({left, right}, baseQtFct) => {

    _.forEach(left, leftAxis => {
        const rightAxis = _.find(right, {type: leftAxis.type, axis: leftAxis.axis});

        const leftBaseQt = baseQtFct(leftAxis);
        const rightBaseQt = baseQtFct(rightAxis);

        leftAxis.ratio = relativeTo1(leftBaseQt, rightBaseQt);
        rightAxis.ratio = relativeTo1(rightBaseQt, leftBaseQt);

    });

    return {left, right};
};

export const separate = (leftAxises, rightAxises) => {

    const leftWithoutQt = _.remove(leftAxises, axis => (_.isNil(axis.qt) || _.isNil(axis.unit)));
    const rightWithoutQt = _.remove(rightAxises, axis => (_.isNil(axis.qt) || _.isNil(axis.unit)));

    const leftWithoutRight = _.remove(leftAxises, axis => !_.find(rightAxises, {axis: axis.axis}));
    const rightWithoutLeft = _.remove(rightAxises, axis => !_.find(leftAxises, {axis: axis.axis}));

    const commonLeft = leftAxises;
    const commonRight = rightAxises;

    return {
        left: [
            ...leftWithoutQt, ...leftWithoutRight
        ],
        common: {left: commonLeft, right: commonRight},
        right: [
            ...rightWithoutQt, ...rightWithoutLeft
        ]
    };
};

const relativeTo1 = (first, second) => first > second ? 1 : format(first / second);
