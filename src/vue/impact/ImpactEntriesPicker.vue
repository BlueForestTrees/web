<template>
    <v-layout column>

        <v-layout column align-center>
            <v-text-field label="Filtrer par nom" autofocus :value="addFilter" @input="setFilter" clearable class="not-too-half"/>
        </v-layout>

        <v-divider/>

        <v-list v-if="items">
            <v-list-tile @click="$emit('select', item)" v-for="item in items" :key="item._id">
                <v-list-tile-content>{{name(item)}}</v-list-tile-content>
            </v-list-tile>
        </v-list>

        <add-entry-btn title="Créer un type d'impact" :action="GO.ADD_IMPACT_ENTRY"/>
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
    import AddEntryBtn from "../common/AddEntryBtn"
    import {GO} from "../../const/go"

    export default {
        name:"impact-entry-picker",
        components: {AddEntryBtn, SelectableList},
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
                addFilter: s => s.nav.tree.impact.addFilter
            }),
            query() {
                return ({
                    term: this.addFilter || undefined
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
                setFilter: Do.SET_TREE_IMPACT_FILTER
            }),
        }
    }
</script>