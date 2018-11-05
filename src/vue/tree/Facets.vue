<template>
    <selectable-list :items="facets" :maxSelectionSize="1" :selection="selection">
        <template slot="bar" slot-scope="{ s }">
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat dense @click="goEquiv(s.oneSelected)">Equivalence
                        <v-icon>arrow_right_alt</v-icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <span style="pointer-events: none">Trouver des équivalences</span>
                </v-tooltip>
            </v-toolbar-items>
            <v-spacer/>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="s.unselect()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </v-toolbar-items>
        </template>
        <open-message slot="no-items" :section="section"/>
    </selectable-list>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import OpenMessage from "../common/OpenMessage"

    export default {
        components: {
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection'],
        computed: {
            facets: function () {
                return this.tree && this.tree.facets
            },
            section: function () {
                return {
                    title: `Aucune propriété n'est spécifiée pour ce produit. Indiquez si vous aimeriez les connaître.`,
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