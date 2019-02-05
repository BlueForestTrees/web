<template>
    <span>
        <div ref="network" style="height:400px">
        </div>
        <v-icon class="bottom-right hand" large>fullscreen</v-icon>
    </span>
</template>

<script>
    import {DataSet, Network} from 'vis/index-network'
    import {qtUnitName} from "../../services/calculations"
    import Static from "../mixin/Static"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "TreeNav",
        mixins: [Static],
        props: ['tree', 'fragment'],
        static: () => ({
            options: {
                interaction: {
                    selectConnectedEdges: false
                },
                edges: {
                    arrows: {
                        to: {
                            enabled: false,
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
            edges: new DataSet([])
        }),
        mounted() {
            new Network(this.$refs.network, {nodes: this.nodes, edges: this.edges}, this.options)
            this.nodes.add({id: this.tree._id, label: qtUnitName(this.tree)})
            this.expand(this.tree)
        },
        methods: {
            async expand(tree) {

                if (!tree[this.fragment]) {
                    await this.updateTree({tree, fragments: [this.fragment]})
                }

                for (let i = 0; i < tree[this.fragment].length; i++) {
                    this.traverse(tree, tree[this.fragment][i])
                }
            },
            traverse(tree, root) {
                this.nodes.add({id: root._id, label: qtUnitName(root)})
                this.edges.add({from: root._id, to: tree._id})
                this.expand(root)
            },
            ...mapActions({updateTree: On.UPDATE_TREE})
        },
    }
</script>

<style scoped>

</style>