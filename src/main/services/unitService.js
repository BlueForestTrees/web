import _ from 'lodash';
import initial from "./initialService";
import {bestRound} from "./calculations";

export const units = () => initial.unitModel.unitsData;
export const grandeurs = () => initial.unitModel.grandeursData;


const unit = shortname => {
    return _.has(units(), shortname) ? units()[shortname] : null;
};
const coef = shortname => unit(shortname).coef;

const sameGrandeur = (leftShortname, rightShortname) => {
    const leftUnit = unit(leftShortname);
    const rightUnit = unit(rightShortname);
    return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur;
};

const twoUnitCoef = (leftShortname, rightShortname) => {

    return sameGrandeur(leftShortname, rightShortname)
        ? unit(leftShortname).coef / unit(rightShortname).coef
        : undefined
};

const qtUnitCoef = (leftQuantity, rightQuantity) => {

    return leftQuantity && rightQuantity
        ? leftQuantity.qt / rightQuantity.qt * twoUnitCoef(leftQuantity.unit, rightQuantity.unit)
        : undefined
};

export const grandeurOfUnitShortname = shortname => grandeurByName(unit(shortname).grandeur);
export const grandeurByName = grandeurName => ({[grandeurName]: grandeurs()[grandeurName]});
export const calcCoef = (axis, leftDenorm, rightDenorm) => {
    const leftAxis = _.find(leftDenorm, { axis });
    const rightAxis = _.find(rightDenorm, { axis });

    return qtUnitCoef(leftAxis, rightAxis);
};
export const baseQt = quantity => quantity.qt * coef(quantity.unit);


//CLONE
const unitsFromShortname = shortname => grandeurs()[unit(shortname).grandeur];
export const bestQuantity = (quantity) => {
    const units = unitsFromShortname(quantity.unit);
    const currentUnit = unit(quantity.unit);
    const currentUnitIndex = _.findIndex(units, {shortname: quantity.unit});
    if (currentUnitIndex < units.length - 1) {
        const upperUnit = units[currentUnitIndex + 1];
        const uppingCoef = upperUnit.coef / currentUnit.coef;
        if (quantity.qt >= uppingCoef) {
            return bestQuantity({qt: quantity.qt / uppingCoef, unit: upperUnit.shortname});
        }
    }
    if (currentUnitIndex > 0) {
        const lowerUnit = units[currentUnitIndex - 1];
        const downingCoef = lowerUnit.coef / currentUnit.coef;
        if (quantity.qt <= downingCoef) {
            return bestQuantity({qt: quantity.qt / downingCoef, unit: lowerUnit.shortname});
        }
    }

    return {qt: bestRound(quantity.qt), unit: quantity.unit};
};