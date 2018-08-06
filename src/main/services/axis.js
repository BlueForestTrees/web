import find from 'lodash.find'
import forEach from 'lodash.foreach'
import isNil from 'lodash.isnil'
import {map} from 'unit-manip'
import remove from 'lodash.remove'
import {format} from "./calculations"
import {toBaseQuantity,grandeur, qtUnitCoef} from "unit-manip"
import Vue from 'vue'

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
])
const buildAxis = ({name}, type, items) => map(items, item => ({
    tree: name,
    type,
    name: item.name,
    _qt: item.quantity && item.quantity.qt,
    qt: item.quantity && item.quantity.qt,
    unit: item.quantity && item.quantity.unit,
    baseQt: item.quantity && toBaseQuantity(item.quantity).qt,
    _baseQt: item.quantity && toBaseQuantity(item.quantity).qt,
    grandeur: grandeur(item.quantity && item.quantity.unit)
}))

/**
 * Placer les axes dans la bonne zone: commun, left ou right.
 * @param leftAxises
 * @param rightAxises
 * @returns {{left: *[], common: {left: *, right: *}, right: *[]}}
 */
export const separate = (leftAxises, rightAxises) => {

    //Un axe sans quantité est retiré des axes communs
    const leftWithoutQt = remove(leftAxises, axis => (isNil(axis._qt) || isNil(axis.unit)))
    const rightWithoutQt = remove(rightAxises, axis => (isNil(axis._qt) || isNil(axis.unit)))

    //Un axe qui n'a pas son équivalent de l'autre côté est retiré des communs
    const leftWithoutRight = remove(leftAxises, axis => !find(rightAxises, {name: axis.name, type: axis.type, grandeur: axis.grandeur}))
    const rightWithoutLeft = remove(rightAxises, axis => !find(leftAxises, {name: axis.name, type: axis.type, grandeur: axis.grandeur}))

    //Les axes restant sont les axes communs
    const commonLeft = leftAxises
    const commonRight = rightAxises

    return {
        left: [
            ...leftWithoutQt, ...leftWithoutRight
        ],
        common: {left: commonLeft, right: commonRight},
        right: [
            ...rightWithoutQt, ...rightWithoutLeft
        ]
    }
}

export const applyBase = (base, axises) => {
    if (base) {
        const rightCoef = coefToBase(base, axises.common.right)
        applyCoef(axises.right, rightCoef)
        applyCoef(axises.common.right, rightCoef)

        const leftCoef = coefToBase(base, axises.common.left)
        applyCoef(axises.left, leftCoef)
        applyCoef(axises.common.left, leftCoef)

        updateRatios(axises)
    }
}

export const coefToBase = (base, axises) => {
    const axis = find(axises, {name: base.name})
    return qtUnitCoef(base, {qt: axis._qt, unit: axis.unit})
}
export const applyCoef = (axises, coef) => forEach(axises, axis => {
    axis.qt = axis._qt * coef
    axis.baseQt = axis._baseQt * coef
})

export const updateRatios = (axises) => {

    forEach(axises.common.left, leftAxis => {
        const rightAxis = find(axises.common.right, {type: leftAxis.type, name: leftAxis.name})
        Vue.set(leftAxis, "ratio", relativeTo1(leftAxis.baseQt, rightAxis.baseQt))
        Vue.set(rightAxis, "ratio", relativeTo1(rightAxis.baseQt, leftAxis.baseQt))
    })

    return axises
}
const relativeTo1 = (first, second) => first > second ? 1 : format(first / second)