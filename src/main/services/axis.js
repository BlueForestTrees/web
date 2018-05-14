import {find, forEach, isNil, map, remove} from 'lodash';
import {format} from "./calculations";
import {grandeur, qtUnitCoef} from "trees-units";

/**
 * un arbre en axes.
 * tree =>
 * [
 {tree: "leftTreeName", type:"facet", name: "Prix", qt:20, unit:"€"},
 {tree: "leftTreeName", type:"trunk", name: "Quantité", qt:20, unit:"l"},
 {tree: "leftTreeName", type:"tank", name: "Eau", qt:5, unit:"mol"},
 {tree: "leftTreeName", type:"tank", name: "Elec", qt:12, unit:"mol"},
 ]
 * @param tree
 */
export const buildAxises = tree => ([
    ...buildAxis(tree.trunk, "trunk", [{...tree.trunk, name: "Quantité"}]),
    ...buildAxis(tree.trunk, "facet", tree.facets.items),
    ...buildAxis(tree.trunk, "tank", tree.tank.items),
    ...buildAxis(tree.trunk, "impactsTank", tree.impactsTank.items),
]);
const buildAxis = ({name}, type, items) => map(items, item => ({
    tree: name,
    type,
    name: item.name,
    _qt: item.quantity && item.quantity.qt,
    qt: item.quantity && item.quantity.qt,
    unit: item.quantity && item.quantity.unit,
    grandeur: grandeur(item.quantity && item.quantity.unit)
}));

/**
 * Placer les axes dans la bonne zone: commun, left ou right.
 * @param leftAxises
 * @param rightAxises
 * @returns {{left: *[], common: {left: *, right: *}, right: *[]}}
 */
export const separate = (leftAxises, rightAxises) => {

    //Un axe sans quantité est retiré des axes communs
    const leftWithoutQt = remove(leftAxises, axis => (isNil(axis._qt) || isNil(axis.unit)));
    const rightWithoutQt = remove(rightAxises, axis => (isNil(axis._qt) || isNil(axis.unit)));

    //Un axe qui n'a pas son équivalent de l'autre côté est retiré des communs
    const leftWithoutRight = remove(leftAxises, axis => !find(rightAxises, {name: axis.name, type: axis.type, grandeur: axis.grandeur}));
    const rightWithoutLeft = remove(rightAxises, axis => !find(leftAxises, {name: axis.name, type: axis.type, grandeur: axis.grandeur}));

    //Les axes restant sont les axes communs
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

/** Insère sur chaque axe le ratio de sa quantité de 0 à 1*/
export const insertRatios = ({left, right}, baseQtFunc) => {

    forEach(left, leftAxis => {
        const rightAxis = find(right, {type: leftAxis.type, name: leftAxis.name});

        const leftBaseQt = baseQtFunc(leftAxis);
        const rightBaseQt = baseQtFunc(rightAxis);

        leftAxis.ratio = relativeTo1(leftBaseQt, rightBaseQt);
        rightAxis.ratio = relativeTo1(rightBaseQt, leftBaseQt);

    });

    return {left, right};
};
const relativeTo1 = (first, second) => first > second ? 1 : format(first / second);


export const applyBase = (base, axises) => {
    if (base) {
        const rightCoef = coefToBase(base, axises.common.right);
        applyCoef(axises.right, rightCoef);
        applyCoef(axises.common.right, rightCoef);

        const leftCoef = coefToBase(base, axises.common.left);
        applyCoef(axises.left, leftCoef);
        applyCoef(axises.common.left, leftCoef);
    }
};

/** trouve le coef pour passer de la base vers son axe dans la liste */
export const coefToBase = (base, axises) => {
    const axis = find(axises, {name: base.name});
    return qtUnitCoef(base, {qt: axis._qt, unit: axis.unit});
};
/** Applique le coef aux quantités */
export const applyCoef = (axises, coef) => forEach(axises, axis => axis.qt = axis._qt * coef);