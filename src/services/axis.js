import {map} from 'unit-manip'
import {quantity, name as _name, isNil, remove} from "./calculations"
import {find} from 'unit-manip'
import Vue from 'vue'

/**
 * un arbre en axes.
 * tree =>
 * [
 {tree: "leftTreeName", type:"facet", name: "Prix", bqt:20, g:"Prix"},
 {tree: "leftTreeName", type:"trunk", name: "Quantité", bqt:20, g:"Elec"},
 {tree: "leftTreeName", type:"tank", name: "Eau", bqt:5, unit:"Mass"},
 {tree: "leftTreeName", type:"tank", name: "Elec", bqt:12, g:"Mass"},
 ]
 * @param tree
 */
export const buildAxises = tree => ([
    ...buildAxis(tree.trunk, "facets", tree.facets),
    ...buildAxis(tree.trunk, "tank", tree.tank),
    ...buildAxis(tree.trunk, "impactsTank", tree.impactsTank),
    ...buildAxis(tree.trunk, "damagesTank", tree.damagesTank),
])
const eq = eq => eq ? {eq} : {}
const buildAxis = ({name}, type, items) => items && map(items, item => ({
    tree: name,
    type,
    name: _name(item),
    bqt: quantity(item).bqt,
    g: quantity(item).g,
    ...eq(quantity(item).bqt.eq)
})) || []

/**
 * Placer les axes dans la bonne zone: commun, left ou right.
 * @param leftAxises
 * @param rightAxises
 * @returns {{left: *[], common: [{left: axis, right: axis}], right: *[]}}
 */
export const separate = (leftAxises, rightAxises) => {

    //Un axe sans quantité est retiré des axes communs
    const leftWithoutQt = remove(leftAxises, axis => (isNil(axis.bqt) || isNil(axis.g)))
    const rightWithoutQt = remove(rightAxises, axis => (isNil(axis.bqt) || isNil(axis.g)))

    //Un axe qui n'a pas son équivalent de l'autre côté est retiré des communs
    const leftWithoutRight = remove(leftAxises, axis => !find(rightAxises, {name: axis.name, type: axis.type, g: axis.g}))
    const rightWithoutLeft = remove(rightAxises, axis => !find(leftAxises, {name: axis.name, type: axis.type, g: axis.g}))

    //Les axes restant sont les axes communs
    const common = []
    const zero = []
    for (let i = 0; i < leftAxises.length; i++) {
        if (!(leftAxises[i].bqt === 0 && rightAxises[i].bqt === 0)) {
            common.push({left: leftAxises[i], right: rightAxises[i]})
        } else {
            zero.push({left: leftAxises[i], right: rightAxises[i]})
        }
    }


    return {
        left: [
            ...leftWithoutQt, ...leftWithoutRight
        ],
        common, zero,
        right: [
            ...rightWithoutQt, ...rightWithoutLeft
        ]
    }
}

export const updateRatios = (axises) => {
    for (let i = 0; i < axises.common.length; i++) {
        try {
            const leftAxis = axises.common[i].left
            const rightAxis = axises.common[i].right
            const sum = leftAxis.bqt + rightAxis.bqt
            Vue.set(leftAxis, "ratio", Math.min(Math.max(leftAxis.bqt / sum, -1.1), 1.1))
            Vue.set(rightAxis, "ratio", Math.min(Math.max(rightAxis.bqt / sum, -1.1), 1.1))
        } catch (e) {
            console.error("err update ratio ", axises.common[i])
        }
    }
    //axises.common.sort((a, b) => b.left.ratio - a.left.ratio)
    return axises
}

export const rightRatio = axises => {
    let left = 0
    let right = 0
    for (let i = 0; i < axises.length; i++) {
        left += axises[i].left.bqt
        right += axises[i].right.bqt
    }
    return right / (left + right)
}