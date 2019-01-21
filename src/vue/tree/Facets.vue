<template>
    <card>
        <selectable-list :items="facets" :maxSelectionSize="1" :selection="selection">
            <open-message class="mt-5" slot="no-items" :section="section"/>
        </selectable-list>
    </card>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import OpenMessage from "../common/OpenMessage"
    import Card from "../common/Card"

    export default {
        components: {
            Card,
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