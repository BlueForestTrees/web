export function iterativelyWalk(node) {
    let nodes = [node]
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].children) {
            nodes = nodes.concat(nodes[i].children)
        }
    }
    return nodes
}


export class DrawTree {

    constructor(tree, childrenName = 'children', parent = null, depth = 0, number = 1) {
        this.x = -1
        this.y = depth
        this.tree = tree
        this.children = tree[childrenName] && tree[childrenName].map((c, i) => new DrawTree(c, childrenName, this, depth + 1, i + 1)) || []
        this.parent = parent
        this.thread = null
        this.mod = 0
        this.ancestor = this
        this.change = this.shift = 0
        this._lmost_sibling = null
        this.number = number
    }

}

DrawTree.prototype.left = function () {
    return this.thread || this.children.length && this.children[0]
}

DrawTree.prototype.right = function () {
    return this.thread || this.children.length && this.children[this.children.length - 1]
}

DrawTree.prototype.left_brother = function () {
    let n = null
    if (this.parent) {
        for (let i = 0; i < this.parent.children.length; i++) {
            const node = this.parent.children[i]
            if (node === this) {
                return n
            } else {
                n = node
            }
        }
    }
    return n
}

DrawTree.prototype.leftmost_sibling = function () {
    if (!this._lmost_sibling && this.parent && this !== this.parent.children[0])
        this._lmost_sibling = this.parent.children[0]

    return this._lmost_sibling
}

export function treePlacement(tree, fragmentName = "children", reversed = true) {
    const dt = new DrawTree(tree, fragmentName)
    const result = buchheim(dt)
    const listResult = iterativelyWalk(result)
    return reversed && listResult.sort((a, b) => b.y - a.y) || listResult
}

function buchheim(tree) {
    let dt = firstwalk(tree)
    console.log()
    second_walk(dt)
    return dt
}

function firstwalk(v, distance = 1) {
    console.log()
    console.log(v.tree.name, "firstwalk")
    if (v.children.length === 0) {
        if (v.leftmost_sibling()) {
            v.x = v.left_brother().x + distance
            console.log(v.tree.name, "no children. Left most: x =", v.x)
        } else {
            v.x = 0
            console.log(v.tree.name, "no children. No left most, x = 0")
        }
    } else {
        console.log(v.tree.name, "children:")
        let default_ancestor = v.children[0]
        for (let i = 0; i < v.children.length; i++) {
            const w = v.children[i]
            firstwalk(w)
            default_ancestor = apportion(w, default_ancestor, distance)
        }
        execute_shifts(v)

        let midpoint = (v.children[0].x + v.children[v.children.length - 1].x) / 2

        console.log(v.tree.name, "midpoint:", midpoint)

        let w = v.left_brother()
        if (w) {
            v.x = w.x + distance
            v.mod = v.x - midpoint
            console.log(v.tree.name, " left brother ", w.tree.name, " v.mod = ", v.mod)
        } else {
            console.log(v.tree.name, "no left brother")
            v.x = midpoint
        }
    }
    console.log(v.tree.name, "end firstwalk")
    return v
}


function apportion(v, default_ancestor, distance) {
    // console.log()
    // console.log(v.tree.name, "apportion")
    let w = v.left_brother()
    if (w !== null) {
        let vir = v
        let vor = v
        let vil = w
        let vol = v.leftmost_sibling()
        let sir = v.mod
        let sor = v.mod
        let sil = vil.mod
        let sol = vol.mod
        while (vil.right() && vir.left()) {
            vil = vil.right()
            vir = vir.left()
            vol = vol.left()
            vor = vor.right()
            vor.ancestor = v
            let shift = (vil.x + sil) - (vir.x + sir) + distance
            if (shift > 0) {
                let a = ancestor(vil, v, default_ancestor)
                move_subtree(a, v, shift)
                sir = sir + shift
                sor = sor + shift
                sil += vil.mod
                sir += vir.mod
                sol += vol.mod
                sor += vor.mod
                if (vil.right() && !vor.right()) {
                    vor.thread = vil.right()
                    vor.mod += sil - sor
                } else {
                    if (vir.left() && !vol.left()) {
                        vol.thread = vir.left()
                        vol.mod += sir - sol
                        default_ancestor = v

                        //console.log(v.tree.name, "apportion, ancestor:", default_ancestor)
                        return default_ancestor
                    }
                }
            }
        }
    }
    // console.log(v.tree.name, "apportion, no default ancestor")
}


function move_subtree(wl, wr, shift) {
    let subtrees = wr.number - wl.number
    wr.change -= shift / subtrees
    wr.shift += shift
    wl.change += shift / subtrees
    wr.x += shift
    wr.mod += shift
}


function execute_shifts(v) {
    let shift = 0
    let change = 0
    for (let i = v.children.length - 1; i >= 0; i--) {
        const w = v.children[i]
        w.x += shift
        w.mod += shift
        change += w.change
        shift += w.shift + change
    }
}

function ancestor(vil, v, default_ancestor) {
    return v.children.includes(vil.ancestor) ? vil.ancestor : default_ancestor
}


function second_walk(v, m = 0, depth = 0, min = null) {
    //console.log(v.tree.name, "second walk, v.mod =", v.mod, " v.x += ", m)
    v.x += m
    v.y = depth

    if (min === null || v.x < min) {
        min = v.x
    }

    for (let i = 0; i < v.children.length; i++) {
        second_walk(v.children[i], m + v.mod, depth + 1, min)
    }

    console.log(`{name:${v.tree.name}, x:${v.x}, y:${v.y}}`)
    return min
}