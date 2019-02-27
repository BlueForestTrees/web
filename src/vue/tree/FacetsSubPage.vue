<template>
    <facet-adder v-if="modeAdd" :tree="tree" @close="$emit('close')"/>
    <v-card v-else>
        <subpage-title title="Propriétés" icon-class="facet logo">
            <closer slot="right" @close="$emit('close')" />
        </subpage-title>

        <fragment-list :tree="tree" :fragment="FACETS" none="Pas encore d'informations sur les propriétés"></fragment-list>

        <v-divider/>
        <v-layout>
            <v-spacer/>
            <open-message :section="section" no-text/>
        </v-layout>
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
    import SubpageTitle from "./SubpageTitle"
    import {name} from "../../services/calculations"
    import Closer from "../common/Closer"

    export default {
        name: "facets-subpage",
        components: {
            Closer,
            SubpageTitle,
            FragmentList,
            FacetAdder,
            Card,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'modeAdd'],
        data: () => ({
            FACETS
        }),
        computed: {
            facets() {
                return this.tree && this.tree.facets
            },
            section() {
                return {
                    title: `Discussion sur les propriétés de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-facet',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchGoEquiv: On.GO_EQUIV,
                updateTree: On.UPDATE_TREE
            }),
            goEquiv(facet) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: facet._id,
                    sbqt: facet.quantity.bqt
                })
            },
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