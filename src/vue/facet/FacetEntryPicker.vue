<template>
    <v-layout column>

        <v-text-field placeholder="Recherche" autofocus :value="term" @input="setTerm" clearable class="not-too-half"/>

        <v-divider/>

        <v-list v-if="items">
            <v-list-tile @click="$emit('select', item)" v-for="item in items" :key="item._id">
                <v-list-tile-content>{{name(item)}}</v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-layout>
</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex"
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"
    import On from "../../const/on"
    import Do from "../../const/do"
    import {GO} from "../../const/go"

    export default {
        name: 'facet-entry-picker',
        components: {SelectableList},
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
                term: s => s.nav.tree.facet.term
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
                dispatchSearch: On.SEARCH_FACET_ENTRY,
            }),
            ...mapMutations({
                setTerm: Do.SET_TREE_FACET_TERM
            }),
        }
    }
</script>