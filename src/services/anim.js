import {findFct} from "./calculations"
import Vue from "vue"
import TWEEN from "@tweenjs/tween.js"

export const initTween = () => {
    function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
    }

    requestAnimationFrame(animate)
}

export const tweenNodes = (newNodes, oldNodes) => {
    const oldCount = oldNodes.length || 0
    const newCount = newNodes.length

    // console.log("TWEEN NODES: from", oldCount, "to", newCount)

    if (newCount > oldCount) {
        for (var i = 0; i < newCount; i++) {
            const newNode = newNodes[i]
            const oldNode = findFct(oldNodes, oldNode => oldNode.tree._id === newNode.tree._id)
            if (oldNode) {
                const hasMoved = newNode.x !== oldNode.x || newNode.y !== oldNode.y
                if (hasMoved) {
                    // console.log("MOVE", newNode.tree._id, "from previous pos")
                    tweenNode(oldNode, newNode)
                }
            } else {
                const parentNode = findFct(oldNodes, node => node.tree._id === newNode.parent.tree._id) || newNode.parent
                // console.log("NEW", newNode.tree._id, "move from parent", parentNode.tree._id)
                tweenNode(parentNode, newNode)
            }
        }
    }
}

const tweenNode = (o, n) => {
    const curPos = {x: o.x, y: o.y}
    const newPos = {x: n.x, y: n.y}
    const update = () => {
        Vue.set(n, 'x', curPos.x)
        Vue.set(n, 'y', curPos.y)
        // console.log("node #", n.tree.trunk.name, " is now at", n.x, n.y)
    }
    update()
    new TWEEN.Tween(curPos)
        .to(newPos, 500)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(update)
        .start()
}