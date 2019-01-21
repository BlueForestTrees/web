import {map, bqtGToQtUnit, bestQuantity, unitCoef, changeUnit, grandeur, baseQt, find} from "unit-manip"
import {entryKeyFromFragmentName} from "../const/fragments"

export const remove = (source, filter) => {
    const dest = []
    for (let i = 0; i < source.length; i++) {
        if (!filter(source[i])) {
            dest.push(source[i])
        }
    }
    return dest
}
export const isNil = v => v === null || v === undefined
export const createStringObjectId = () => (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase()

export const idQuantity = tree => ({_id: tree._id, quantity: tree.trunk.quantity})
export const hasQuantity = e => e && e.quantity && e.quantity.bqt && e.quantity.g
export const transportQuantity = (masse, distance) => baseQt({qt: changeUnit(masse, "t") * changeUnit(distance, "km"), unit: "t*km"})
export const format = v => v < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10
export const treefyAll = items => map(items, treefy)
export const treefy = trunk => ({_id: trunk._id, trunk})
export const idQtFrom = item => ({_id: item._id, quantity: item.quantity})
export const qtUnit = (item, opts = {}) => {
    const bqtG = quantity(item)
    if (bqtG) {
        const qtUnit = bqtGToQtUnit(bqtG)
        if (qtUnit.qt && qtUnit.unit) {
            const best = bestQuantity(qtUnit)
            return `${(best.qt === 1 && opts.hideOne) ? '' : best.qt} ${grandeur(best.unit) !== "Nomb" ? best.unit : ''}`
        } else {
            return `${isNil(qtUnit.qt) ? "?" : qtUnit.qt} ${qtUnit.unit || " ?"}`
        }
    } else {
        return "??"
    }
}
export const quantity = item => item && (
    (item.selection && item.selection.repeted && item.selection.duree)
    ||
    (item.trunk && item.trunk.quantity)
    ||
    item.quantity
    ||
    item
)

export const qtFreq = selection => selection && selection.repeted ? `${qtUnit(selection.quantity)} / ${qtUnit(selection.freq, {hideOne: true})}` : ""

export const qtFreqOrUnit = item => qtFreq(item) || qtUnit(item)

export const name = item => item && (item.selection && item.selection.repeted && item.selection.name) || (item.name || item.trunk && item.trunk.name) || '?'

export const color = item => item.color || item.trunk.color
export const removeUseless = name => name.replace(/\([^)]*\)/, "...")
export const equiv = item => item.eq ? `(éq. ${item.eq})` : ""
export const qtUnitName = item => item && `${qtUnit(item)} ${name(item)} ${equiv((item.trunk && item.trunk.quantity) || item.quantity || item)}`

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const getLuma = value => {
    const c = value.substring(1)
    const rgb = parseInt(c, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const shadeColor = (color, percent) => {
    const f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

export const blendColors = (c0, c1, p) => {
    const f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1)
}

export const overcolor = c => getLuma(c) < 120 ? "white" : "black"

export const initiales = fullname => {
    const nameSplit = fullname.toUpperCase().split(' ')
    if (nameSplit.length === 1) {
        return nameSplit[0] ? nameSplit[0].charAt(0) : '?'
    } else {
        return nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
    }
}

export const rad = deg => deg * (Math.PI / 180)
export const deg = rad => rad / (Math.PI / 180)

export const range = (min, max) => {
    let array = [], j = 0
    for (let i = min; i <= max; i++) {
        array[j] = i
        j++
    }
    return array
}

export const add = (q1, q2) => ({
    qt: unitCoef(q1.unit, q2.unit) * q1.qt + q2.qt,
    unit: q2.unit
})

export const applyRessourceCoef = (coef, items) => {
    if (items) {
        for (let i = 0; i < items.length; i++) {
            items[i].trunk.quantity.bqt *= coef
        }
        return items
    }
}
export const applyAspectCoef = (coef, items) => {
    if (items) {
        for (let i = 0; i < items.length; i++) {
            items[i].quantity.bqt *= coef
        }
        return items
    }
}

export const applyAxisCoef = (coef, items, prop) => {
    for (let i = 0; i < items.length; i++) {
        if (prop) {
            items[i][prop].bqt *= coef
        } else {
            items[i].bqt *= coef
        }
    }
    return items
}

export const deltaTime = time => {
    const delta = (Date.now() - new Date(time)) / 1000
    return delta < 30 ?
        `à l'instant`
        :
        delta < 60 ?
            `${Math.floor(delta)} sec`
            :
            delta < 3600 ?
                `${Math.floor(delta / 60)} min`
                :
                delta < 24 * 3600 ?
                    `${Math.floor(delta / 3600)} h`
                    :
                    delta < 7 * 24 * 3600 ?
                        `${Math.floor(delta / (24 * 3600))} j`
                        :
                        delta < 4 * 7 * 24 * 3600 ?
                            `${Math.floor(delta / (7 * 24 * 3600))} sem`
                            :
                            delta < 12 * 4 * 7 * 24 * 3600 ?
                                `${Math.floor(delta / (4 * 7 * 24 * 3600))} mois`
                                :
                                `${Math.floor(delta / (12 * 4 * 7 * 24 * 3600))} an`

}

const possible = "abcdefghijklmnopqrstuvwxyz0123456789"
export const generateXRequestId = () => {
    let xRequestId = ""

    for (let i = 0; i < 32; i++)
        xRequestId += possible.charAt(Math.floor(Math.random() * possible.length))

    return xRequestId
}

export const totalQt = selection => selection.repeted ? selection.quantity.bqt * (selection.duree.bqt / selection.freq.bqt) : selection.quantity.bqt

export const coefFromTrunkToSelection = (selection, tree) => selectionTotalQt(selection) / tree.trunk.quantity.bqt


export const selectionTotalQt = selection =>
    selection.repeted ?
        selection.quantity.bqt * (selection.duree.bqt / selection.freq.bqt)
        :
        selection.quantity.bqt

export const treeTotalQt = tree => tree.selection ? selectionTotalQt(tree.selection) : tree.trunk.quantity.bqt

//in: une liste d'arbre, un nom de fragment
//out: un objet {_id:attrDeArbre1} avec tous les attributs en communs sur tout les arbres.
export const extractCommons = (trees, fragment) => {
    const entryKey = entryKeyFromFragmentName[fragment]
    const treesFragment =
        trees.map(tree =>
            tree[fragment].reduce(
                (treeFragment, attribute) => Object.assign(treeFragment, {[attribute[entryKey]]: attribute}), {}
            )
        )

    let commons = []
    const firstTreeFragment = treesFragment[0]
    for (let key in firstTreeFragment) {
        if (inAll(treesFragment, key)) {
            commons.push({_id: key, type: fragment, name: firstTreeFragment[key].name})
        }
    }
    return commons
}

const inAll = (treesFragment, key) => {
    for (let treeFragment of treesFragment) {
        if (!treeFragment.hasOwnProperty(key)) return false
    }
    return true
}

export const coefByFragment = (left, right, fragment) => {
    const leftAttribute = getAttributeByFragment(left, fragment)
    const rightAttribute = getAttributeByFragment(right, fragment)
    return quantity(leftAttribute).bqt / quantity(rightAttribute).bqt
}

export const getAttributeByFragment = (tree, {type, _id}) => find(tree[type], entryKeyFromFragmentName[type], _id)