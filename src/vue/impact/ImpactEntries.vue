<template>
<span>
        <span style="width: 100%">

            <v-card-title primary-title>
                <p style="padding-right:1em">Filtre</p>
                <v-text-field label="Nom" autofocus v-model="namePart"></v-text-field>
            </v-card-title>
            <v-divider/>

            <v-list v-if="items">
                <v-list-tile @click="$emit('select', item)" v-for="item in items" :key="item._id">
                    <v-list-tile-content>{{name(item)}}</v-list-tile-content>
                </v-list-tile>
            </v-list>

        </span>
        <add-impact-entries-btn/>

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

    </span>
</template>
<script>
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import AddImpactEntriesBtn from "../common/AddImpactEntriesBtn"
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"

    export default {
        components: {SelectableList, AddImpactEntriesBtn},
        data: function () {
            return {
                namePart: null,
                items: null,
                detailsDialog: false
            }
        },
        computed: {
            query: function () {
                return {
                    term: this.namePart || undefined
                }
            },
            ...mapState(['nav'])
        },
        created: function () {
            this.namePart = ""
        },
        watch: {
            query: function (query) {
                this.dispatchSearch(query)
                    .then(items => this.items = items)
            }
        },
        methods: {
            name,
            ...mapActions({
                dispatchSearch: On.SEARCH_IMPACT_ENTRY,
            })
        }
    }
</script>