export const tank = trunk => _.values(addAllSeeds(trunk, {}));
export const format = v => v < 10 ? Math.floor(v * 100) / 100 : Math.floor(v * 10) / 10;

const addAllSeeds = (trunk, tank) => {
    _.forEach(trunk.roots, seed => {
        if (_.isEmpty(seed.roots)) {
            let tankEntry = tank[seed._id] || {_id: seed._id, name: seed.name, qt: 0};
            tankEntry.qt += seed.qt;
            tank[seed._id] = tankEntry;
        } else {
            addAllSeeds(seed, tank);
        }
    });
    return tank;
};


const baseValueByAxis = {
    "Prix": tree => ({qt:tree.price,unit:"€"}),
    "Quantité": tree => ({qt:tree.quantity.qt,unit:tree.quantity.unit})
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

export const extraireAxePrincipal = (axis, leftTree, rightTree) => {
    let coef = null;
    let qt = 69;
    let unit = "mmk";

    if (baseValueByAxis[axis]) {
        //c'est une base
        coef = baseValueByAxis[axis](leftTree).qt / baseValueByAxis[axis](rightTree).qt;
        qt = Math.max(baseValueByAxis[axis](leftTree).qt,baseValueByAxis[axis](rightTree).qt);
        unit = baseValueByAxis[axis](leftTree).unit;
    } else {
        //c'est une facet
        coef = facetQt(leftTree, axis) / facetQt(rightTree, axis);
        qt = Math.max(facetQt(leftTree, axis), facetQt(rightTree, axis));
        unit = facetUnit(leftTree, axis);
    }
    return {name:axis, coef, qt, unit};
};

const applyCoef = (tree, coef) => {
    tree.quantity.qt *= coef;
    tree.price *= coef;
    _.each(tree.facets, facet => facet.qt *= coef);
    return tree;
};


const relativeTo1 = (first, second) => first > second ? 1 : format(first / second);


export const treeToRadar =
    ({leftTree, rightTree, coef}) => toRadarData({leftTree, rightTree: applyCoef(rightTree, coef)});

/**
 *
 * @param leftTree, un arbre
 * @param rightTree, un arbre
 * @returns  let radarData = [
 [
 {axis: "leftTreeName", name: "Prix", coef: 1, qt:20, unit:"€"},
 {name: "Quantité", coef: 1, qt:20, unit:"l"},
 {name: "Lipides", coef: 1, qt:5, unit:"mol"},
 {name: "Glucides", coef: 1, qt:12, unit:"mol"},
 ],
 [
 {name: "Prix", coef: 0.22, qt:20, unit:"€"},
 {name: "Quantité", coef: 1, qt:20, unit:"l"},
 {name: "Lipides", coef: 0.5, qt:2.5, unit:"mol"},
 {name: "Glucides", coef: 0, qt:0, unit:"mol"},
 ]
 ];
 */
export const toRadarData = ({leftTree, rightTree}) => {

    if (!leftTree || !rightTree || !leftTree.facets || !rightTree.facets) {
        console.warn("rendu de radar sans data", leftTree, rightTree);
        return;
    }

    const leftFacets = leftTree.facets;
    const rightFacets = rightTree.facets;

    const leftNames = _.map(leftFacets, 'name');
    const rightNames = _.map(rightFacets, 'name');

    const commonNames = _.intersection(leftNames, rightNames);

    const left = _.map(commonNames, name => ({
        name, coef: relativeTo1(_.find(leftFacets, {name}).qt, _.find(rightFacets, {name}).qt),
        qt: format(_.find(leftFacets, {name}).qt),
        unit: _.find(leftFacets, {name}).unit,
        axis: leftTree.name
    }));
    const right = _.map(commonNames, name => ({
        name, coef: relativeTo1(_.find(rightFacets, {name}).qt, _.find(leftFacets, {name}).qt),
        qt: format(_.find(rightFacets, {name}).qt),
        unit: _.find(rightFacets, {name}).unit,
        axis: rightTree.name
    }));

    const leftFacetsOnly = _.difference(leftNames, rightNames);
    _.forEach(leftFacetsOnly, name => {
        left.push({
            name, coef: 1,
            qt: format(_.find(leftFacets, {name}).qt),
            unit: _.find(leftFacets, {name}).unit,
            axis: leftTree.name
        });
        right.push({
            name, coef: 0,
            qt: 0,
            unit: _.find(leftFacets, {name}).unit,
            axis: rightTree.name,
        });
    });

    const rightFacetsOnly = _.difference(rightNames, leftNames);
    _.forEach(rightFacetsOnly, name => {
        right.push({
            name, coef: 1,
            qt: format(_.find(rightFacets, {name}).qt),
            unit: _.find(rightFacets, {name}).unit,
            axis: rightTree.name,
        });
        left.push({
            name, coef: 0,
            qt: 0,
            unit: _.find(rightFacets, {name}).unit,
            axis: leftTree.name
        });
    });


    _.forEach(baseValueByAxis, (valFct, name) => {
        left.push({
            name, coef: relativeTo1(valFct(leftTree).qt, valFct(rightTree).qt),
            qt: format(valFct(leftTree).qt),
            unit: valFct(leftTree).unit,
            axis: leftTree.name
        });
        right.push({
            name, coef: relativeTo1(valFct(rightTree).qt, valFct(leftTree).qt),
            qt: format(valFct(rightTree).qt),
            unit: valFct(rightTree).unit,
            axis: rightTree.name
        });
    });

    return {leftTree:left, rightTree:right};
};

export const toQtUnit = rawInput => {
    if (!rawInput)
        return null;
    const r = rawInput.match(/^(\d+[.,]?\d*)([a-zA-Z]+)?$/);

    if (r) {

        let q, u;
        [, q, u] = r;

        return {qt: parseFloat(q.replace(',', '.')), unit: u || ""};
    } else {
        return null;
    }
};