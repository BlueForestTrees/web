import _ from 'lodash';

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    unit: state => shortname => _.has(state.units, shortname) ? state.units[shortname] : null,
    coef: (state,getters) => shortname => getters.unit(shortname).coef,
    grandeurOfUnitShortname: (state, getters) => shortname => getters.grandeurByName(getters.unit(shortname).grandeur),
    grandeurByName: (state) => grandeurName => ({[grandeurName]: state.grandeurs[grandeurName]}),

    sameGrandeur: (state, getters) => (leftShortname, rightShortname) => {
        const leftUnit = getters.unit(leftShortname);
        const rightUnit = getters.unit(rightShortname);
        return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur;
    },

    twoUnitCoef: (state, getters) => (leftShortname, rightShortname) => {

        return getters.sameGrandeur(leftShortname, rightShortname)
            ? getters.unit(leftShortname).coef / getters.unit(rightShortname).coef
            : undefined
    },

    qtUnitCoef: (state, getters) => (leftQuantity, rightQuantity) => {

        return leftQuantity && rightQuantity
            ? leftQuantity.qt / rightQuantity.qt * getters.twoUnitCoef(leftQuantity.unit, rightQuantity.unit)
            : undefined
    },
    calcCoef: (state, getters) => (axis, leftDenorm, rightDenorm) => {
        const leftAxis = _.find(leftDenorm, {axis});
        const rightAxis = _.find(rightDenorm, {axis});

        return getters.qtUnitCoef(leftAxis, rightAxis);
    },

    baseQt: (state, getters) => quantity => quantity.qt * getters.coef(quantity.unit)
};