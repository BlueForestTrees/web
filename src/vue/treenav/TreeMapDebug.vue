<template>
    <svg id="surface" viewBox="-300, -300, 600, 600" version="1.2" xmlns="http://www.w3.org/2000/svg">

        <text v-if="loading" x="0" y="-100">loading</text>

        <template v-for="node in nodeList">
            <g :key="node._id">
                <line class="line" :x1="node.x" :y1="node.y" :x2="node.parent.x" :y2="node.parent.y"></line>
                <circle :key="node._id" @click="addNode(node)"
                        r="20" :cx="node.x" :cy="node.y" fill="blue" opacity="0.5"
                ></circle>
                <text :x="node.x" :y="node.y">{{node._id}}</text>
            </g>
        </template>

    </svg>
</template>

<script>
    import TWEEN from "@tweenjs/tween.js"
    import {findFct} from "../../services/calculations"
    import Vue from "vue"

    let nodeIdx = 0
    const getANode = parent => ({_id: '' + nodeIdx++, parent, x: parent.x, y: parent.y + 50})

    export default {
        name: "TreeMapDebug",
        data: function () {
            return {
                loading: false,
                nodeList: [getANode({x: 0, y: 0})],
            }
        },
        mounted() {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            this.addNode(this.nodeList[0])
        },
        watch: {
            nodeList(o, n) {
                console.log("WATCH: nodeList changed")
                this.tweenNodes(o, n)
            }
        },
        methods: {
            tweenNodes: function (newNodes, oldNodes) {
                const oldCount = oldNodes.length || 0
                const newCount = newNodes.length

                console.log("TWEEN NODES: count", oldCount, "=>", newCount)

                if (newCount > oldCount) {
                    for (var i = 0; i < newCount; i++) {
                        const newNode = newNodes[i]
                        const oldNode = findFct(oldNodes, node => node._id === newNode._id)
                        if (oldNode) {
                            const hasMoved = newNode.x !== oldNode.x || newNode.y !== oldNode.y
                            if (hasMoved) {
                                this.tweenNode(oldNode, newNode)
                            }
                        } else {
                            const parentNode = findFct(oldNodes, node => node._id === newNode.parent._id) || newNode.parent
                            this.tweenNode(parentNode, newNode)
                        }
                    }
                }
            },
            tweenNode: function (o, n) {
                const curPos = {x: o.x, y: o.y}
                const newPos = {x: n.x, y: n.y}
                const update = () => {
                    Vue.set(n, 'x', curPos.x)
                    Vue.set(n, 'y', curPos.y)
                    console.log("node #", n._id, " is now at", n.x, n.y)
                }
                new TWEEN.Tween(curPos)
                    .to(newPos, 400)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onUpdate(update)
                    .start()
            },
            addNode(tree) {
                this.loading = true
                setTimeout(
                    () => {
                        this.nodeList = this.nodeList.concat([getANode(tree), getANode(tree)])
                        console.log("a node has been added")
                        this.loading = false
                    }, 50
                )
            }
        },
    }
</script>