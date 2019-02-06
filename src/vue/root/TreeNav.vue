<template>
    <div ref="network" style="height:400px"></div>
</template>

<script>
    import {DataSet, Network} from 'vis/index-network'
    import {qtUnitName} from "../../services/calculations"
    import Static from "../mixin/Static"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Selectable from "../mixin/Selectable"
    import {BRANCHES, ROOTS} from "../../const/fragments"
    import {PRIMARY} from "../../const/colors"

    export default {
        name: "TreeNav",
        mixins: [Static, Selectable],
        props: ['tree'],
        static: () => ({
            options: {
                interaction: {
                    selectConnectedEdges: false
                },
                edges: {
                    arrows: {
                        to: {
                            enabled: true,
                            type: "arrow",
                        }
                    },
                    color: {
                        color: "#444444",
                    }
                },
                layout: {
                    hierarchical: {
                        enabled: true,
                        direction: 'LR',
                        sortMethod: 'directed'
                    }
                },
                nodes: {
                    shape: "dot",
                    size: 20,
                    color: {
                        border: "#444444",
                        background: "white",
                        highlight:{
                            background: "#D8E9F5"
                        }
                    },
                    font: {
                        size: 18,
                        color: "#444444",
                        face: "roboto"
                    }
                }
            },
            nodes: new DataSet([]),
            edges: new DataSet([]),
            network: null,
            itemsMap: {}
        }),
        mounted() {
            this.network = new Network(this.$refs.network, {nodes: this.nodes, edges: this.edges}, this.options)
            this.network.on("selectNode", params => this.toggleSelect(this.itemsMap[params.nodes[0]]))
            this.network.on("dragStart", params => {
                const draggedId = params.nodes[0]
                if (draggedId) {
                    this.unselect()
                    this.toggleSelect(this.itemsMap[draggedId])
                }
            })
            this.network.on("deselectNode", params => this.toggleSelect(this.itemsMap[params.previousSelection.nodes[0]]))
            this.addNode(this.tree, {color: {background: PRIMARY}})
            this.expand(this.tree, ROOTS)
            this.expand(this.tree, BRANCHES)
        },
        methods: {
            async expand(tree, scope) {
                if (!tree[scope]) {
                    await this.updateTree({tree, fragments: [scope]})
                }

                for (let i = 0; i < tree[scope].length; i++) {
                    this.traverse(tree, tree[scope][i], scope)
                }
            },
            traverse(tree, item, scope) {
                this.addNode(item)
                this.addEdge(tree, item, scope)
                this.expand(item, scope)
            },
            addNode(tree, options) {
                this.nodes.add({id: tree._id, label: qtUnitName(tree), ...options})
                this.itemsMap[tree._id] = tree
            },
            addEdge(tree, item, scope) {
                if (scope === ROOTS) {
                    this.edges.add({from: item._id, to: tree._id})
                } else if (scope === BRANCHES) {
                    this.edges.add({from: tree._id, to: item._id})
                }
            },
            ...mapActions({updateTree: On.UPDATE_TREE})
        },
    }
</script>

<style scoped>

</style>