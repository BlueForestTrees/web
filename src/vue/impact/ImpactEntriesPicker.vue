<template>
    <v-layout column>

        <v-layout column align-center>
            <v-text-field label="Filtrer par nom" autofocus :value="term" @input="setTerm" clearable class="not-too-half"/>
        </v-layout>

        <v-divider/>

        <v-list v-if="items">
            <v-list-tile @click="$emit('select', item)" v-for="item in items" :key="item._id">
                <v-list-tile-content>{{name(item)}}</v-list-tile-content>
            </v-list-tile>
        </v-list>

        <add-entry-fab title="Créer un type d'impact" :route="GO.ADD_IMPACT_ENTRY"/>
    </v-layout>

    <!--<v-dialog v-model="detailsDialog" max-width="800">-->
    <!--<v-card>-->
    <!--<v-card-title class="headline">Détails de {{oneSelected.name}}</v-card-title>-->
    <!--<v-divider/>-->
    <!--<v-card-text>-->
    <!--<v-list-tile v-for="(value, key) in oneSelected.raw" :key="key">-->
    <!--<p>{{key}}</p><v-spacer/><p>{{value}}</p>-->
    <!--</v-list-tile>-->
    <!--</v-card-text>-->

    <!--<v-card-actions>-->
    <!--<v-spacer></v-spacer>-->
    <!--<v-btn color="primary" flat="flat" @click="nav.detailsDialog = false">OK</v-btn>-->
    <!--</v-card-actions>-->
    <!--</v-card>-->
    <!--</v-dialog>-->

</template>
<script>
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"
    import Do from "../../const/do"
    import {GO} from "../../const/go"
    import AddEntryFab from "../common/AddEntryFab"

    export default {
        name:"impact-entry-picker",
        components: {AddEntryFab, SelectableList},
        data: function () {
            return {
                GO,
                items: null,
                detailsDialog: false
            }
        },
        created() {
            this.refresh()
        },
        watch: {
            query() {
                this.refresh()
            }
        },
        computed: {
            ...mapState({
                term: s => s.nav.tree.impact.term
            }),
            query() {
                return ({
                    term: this.term || undefined
                })
            }
        },
        methods: {
            name,
            async refresh() {
                this.items = await this.dispatchSearch(this.query)
            },
            ...mapActions({
                dispatchSearch: On.SEARCH_IMPACT_ENTRY,
            }),
            ...mapMutations({
                setTerm: Do.SET_TREE_IMPACT_TERM
            }),
        }
    }
</script>