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

        <add-entry-btn title="Créer un type de propriété" :action="createEntryRoute"/>

    </v-layout>
</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex"
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"
    import On from "../../const/on"
    import AddEntryBtn from "../common/AddEntryBtn"
    import Do from "../../const/do"
    import {GO} from "../../const/go"

    export default {
        name: 'facet-entry-picker',
        components: {AddEntryBtn, SelectableList},
        props: {
            createEntryRoute: {type: String}
        },
        data: function () {
            return {
                GO,
                items: null,
                detailsDialog: false
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            query() {
                this.refresh()
            }
        },
        computed: {
            ...mapState({
                addFilter: s => s.nav.tree.facet.addFilter
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
                dispatchSearch: On.SEARCH_FACET_ENTRY,
            }),
            ...mapMutations({
                setFilter: Do.SET_TREE_FACET_FILTER
            }),
        }
    }
</script>