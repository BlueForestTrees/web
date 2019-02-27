<template>
    <div>
        <note :text="note" style="position:absolute;z-index:2;background-color: rgba(255,255,255,0.8);"/>
        <div ref="network" style="height:400px"></div>
    </div>
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
    import Note from "../common/Note"

    export default {
        name: "TreeNav",
        components: {Note},
        mixins: [Static, Selectable],
        props: ['tree','note'],
        static: () => ({
            options: {
                interaction: {
                    selectConnectedEdges: false,
                    zoomView: false
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
                        levelSeparation: 130,
                        direction: 'DU',
                        sortMethod: 'directed'
                    }
                },
                nodes: {
                    shape: "dot",
                    size: 20,
                    widthConstraint: 100,
                    color: {
                        border: "#444444",
                        background: "white",
                        highlight: {
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
            this.refreshRoots()
            this.refreshBranches()
        },
        methods: {
            refreshRoots() {
                this.expand(this.tree, ROOTS)
            },
            refreshBranches() {
                this.expand(this.tree, BRANCHES)
            },
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