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

export const toAxis = items => {
    return items && map(items, item => ({
        name: _name(item),
        bqt: quantity(item).bqt,
        g: quantity(item).g,
        ...eq(quantity(item).bqt.eq)
    })) || []
}

export const separate = (leftAxises, rightAxises) => {
    const isCommon = others => axis =>
        !isNil(axis.bqt)
        &&
        !isNil(axis.g)
        &&
        find(others, {name: axis.name, g: axis.g})

    const isCommonLeft = isCommon(rightAxises)
    const isCommonRight = isCommon(leftAxises)

    const isOnlyLeft = axis => !isCommonLeft(axis)
    const isOnlyRight = axis => !isCommonRight(axis)

    const left = leftAxises.filter(isOnlyLeft)
    const right = rightAxises.filter(isOnlyRight)
    const commonLeft = leftAxises.filter(isCommonLeft)
    const commonRight = rightAxises.filter(isCommonRight)
    const common = commonLeft.reduce((acc, cur, i) => {
        acc.push({left: cur, right: commonRight[i]})
        return acc
    }, [])

    return {left, common, right}
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