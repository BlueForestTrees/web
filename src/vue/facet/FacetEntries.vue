<template>
    <span style="width: 100%">
        <v-card-title primary-title>
            <p style="padding-right:1em">Filtre</p>
            <v-text-field label="Nom" autofocus v-model="namePart"></v-text-field>
        </v-card-title>
        <v-divider/>

        <selectable-list :items="items" no-qt />
    </span>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    export default {
        name: 'facetEntries',
        components: {SelectableList},
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
            ...mapActions({
                dispatchSearch: On.SEARCH_FACET_ENTRY,
            })
        }
    }
</script>