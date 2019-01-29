<template>
    <facet-adder v-if="modeAdd" :tree="tree" :selection="selection"/>
    <v-card v-else>
        <v-container>
            <div class="display-1 font-weight-thin">Propriétés</div>
        </v-container>
        <selectable-list :items="facets" :maxSelectionSize="1" :selection="selection">
            <template slot="no-items">
                <v-layout class="align-center justify-center my-5 font-weight-thin title"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas encore d'informations sur les propriétés</v-layout>
            </template>
        </selectable-list>
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

    export default {
        name: "facets-subpage",
        components: {
            FacetAdder,
            Card,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection', 'modeAdd'],
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
            }
        }
    }
</script>