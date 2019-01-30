<template>
    <facet-adder v-if="modeAdd" :tree="tree" :selection="selection"/>
    <v-card v-else>
        <v-container>
            <div class="display-1 font-weight-thin">Propriétés</div>
        </v-container>
        <fragment-list :tree="tree" :selection="selection" :fragment="FACETS" none="Pas encore d'informations sur les propriétés"></fragment-list>
        <open-message :section="section"/>
    </v-card>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import OpenMessage from "../common/OpenMessage"
    import Card from "../common/Card"
    import FacetAdder from "../facet/FacetAdder"
    import {FACETS} from "../../const/fragments"
    import FragmentList from "./FragmentList"

    export default {
        name: "facets-subpage",
        components: {
            FragmentList,
            FacetAdder,
            Card,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection', 'modeAdd'],
        data: () => ({
            FACETS
        }),
        computed: {
            facets() {
                return this.tree && this.tree.facets
            },
            section() {
                return {
                    title: `Participer`,
                    filter: {
                        type: 'trunk-facet',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            ...mapActions({dispatchGoEquiv: On.GO_EQUIV}),
            goEquiv(facet) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: facet._id,
                    sbqt: facet.quantity.bqt
                })
            },
            ...mapActions({updateTree: On.UPDATE_TREE}),
            refresh: async function () {
                this.loading = true
                this.updateTree({tree: this.tree, fragments: [FACETS]})
                this.loading = false
            }
        },
        created() {
            this.refresh()
        }
    }
</script>