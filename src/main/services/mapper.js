export const tank = trunk => _.values(addAllSeeds(trunk, {}));
export const format = bigNumber => Math.floor(bigNumber*100)/100;

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


const valuesByAxis = {
    "Prix": tree => tree.price,
    "Quantité": tree => tree.quantity.qt
};

export const extraireCoef = (axis, {leftTree, rightTree}) => valuesByAxis[axis](leftTree) / valuesByAxis[axis](rightTree);

export const applyCoef = (tree, coef) => {
    tree.quantity.qt *= coef;
    tree.price *= coef;
    _.each(tree.facets, facet => facet.qt *= coef);
};


const relativeTo1 = (first, second) => first > second ? 1 : format(first / second);

/**
 *
 * @param leftTree, un arbre
 * @param rightTree, un arbre
 * @returns  let radarData = [
     [
         {name: "Prix", coef: 1, qt:20, unit:"€"},
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
        unit: _.find(leftFacets, {name}).unit
    }));
    const right = _.map(commonNames, name => ({
        name, coef: relativeTo1(_.find(rightFacets, {name}).qt, _.find(leftFacets, {name}).qt),
        qt: format(_.find(rightFacets, {name}).qt),
        unit: _.find(rightFacets, {name}).unit
    }));

    const leftFacetsOnly = _.difference(leftNames, rightNames);
    _.forEach(leftFacetsOnly, name => {
        left.push({
            name, coef: 1,
            qt: format(_.find(leftFacets, {name}).qt),
            unit: _.find(leftFacets, {name}).unit
        });
        right.push({
            name, coef: 0,
            qt: 0,
            unit: _.find(leftFacets, {name}).unit
        });
    });

    const rightFacetsOnly = _.difference(rightNames, leftNames);
    _.forEach(rightFacetsOnly, name => {
        right.push({
            name, coef: 1,
            qt: format(_.find(rightFacets, {name}).qt),
            unit: _.find(rightFacets, {name}).unit
        });
        left.push({
            name, coef: 0,
            qt: 0,
            unit: _.find(rightFacets, {name}).unit
        });
    });


    _.forEach(valuesByAxis, (valFct, name)=>{
        left.push({name, coef: relativeTo1(valFct(leftTree), valFct(rightTree)),
            qt: format(valFct(leftTree)),
            unit: "€"
        });
        right.push({name, coef: relativeTo1(valFct(rightTree), valFct(leftTree)),
            qt: format(valFct(rightTree)),
            unit: "€"
        });
    });

    console.log(left);
    console.log(right);

    return {left, right};
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