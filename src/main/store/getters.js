import _ from 'lodash';

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    unit: state => shortname => state.units[shortname],
    grandeurOfUnitShortname: (state, getters) => shortname => getters.grandeurByName(getters.unit(shortname).grandeur),
    grandeurByName: (state) => grandeurName => ({[grandeurName]: state.grandeurs[grandeurName]}),

    sameGrandeur: (state, getters) => (leftShortname, rightShortname) => {
        const leftUnit = getters.unit(leftShortname);
        const rightUnit = getters.unit(rightShortname);
        return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur;
    },

    unitCoef: (state, getters) => (leftShortname, rightShortname) => getters.sameGrandeur(leftShortname, rightShortname)
        ? unit(leftShortname).coef / unit(rightShortname).coef
        : undefined,

    qtUnitCoef: (state, getters) => (leftQuantity, rightQuantity) => leftQuantity && rightQuantity
        ? leftQuantity.qt / rightQuantity.qt * getters.unitCoef(leftQuantity.unit, rightQuantity.unit)
        : undefined,

    calcCoef: (state, getters) => (axis, leftDenorm, rightDenorm) => {
        const leftAxis = _.find(leftDenorm, {axis});
        const rightAxis = _.find(rightDenorm, {axis});
        return getters.qtUnitCoef(leftAxis, rightAxis);
    }
};