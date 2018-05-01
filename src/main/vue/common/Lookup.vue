<template>

    <v-menu offset-y style="width: 100%">

        <v-text-field ref="termInput" @input="search" :value="term" slot="activator" prepend-icon="search" placeholder="Recherche"/>

        <transition name="fadeInOut">
            <v-list v-if="allowCreate || hasResults">
                <v-list-tile v-for="tree in searchResults" :key="tree._id" @click="select(tree)">
                    <v-list-tile-avatar>
                        <v-icon>assignment</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>{{ tree.trunk.name }}</v-list-tile-title>
                </v-list-tile>
                <v-divider v-if="allowCreate && hasResults"/>
                <v-list-tile v-if="allowCreate" @click="create(term)">
                    <v-list-tile-avatar>
                        <v-icon>add</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Créer "{{term}}"...</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </transition>
    </v-menu>
</template>

<script>
    import {mapActions} from 'vuex';
    import On from "../../const/on";

    export default {
        props: {cancreate: Boolean},
        data() {
            return {
                term: null,
                searchResults: null,
                searching: null
            }
        },
        computed: {
            searchOccur: function () {
                return this.term && !this.searching && !!this.searchResults
            },
            noResults: function () {
                return _.isEmpty(this.searchResults)
            },
            hasResults: function () {
                return !!(this.searchOccur && !this.noResults)
            },
            exactMatch: function () {
                return !!_.find(this.searchResults, {name: this.term})
            },
            allowCreate: function () {
                return this.cancreate && !!(this.searchOccur && (this.noResults || !this.exactMatch))
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                dispatchCreateTree: On.CREATE_TRUNK
            }),
            focus() {
                this.$refs.termInput.focus();
            },
            async search(value) {
                this.term = value;
                if (value) {
                    this.searching = true;
                    try {
                        this.searchResults = await this.dispatchSearch({term:value});
                    } finally {
                        this.searching = false;
                    }
                }
            },
            select(tree) {
                this.$emit('select', tree);
                this.clearSearch();
            },
            clearSearch() {
                this.term = null;
                this.searchResults = null;
                this.searching = null;
            },
            create: async function (term) {
                this.select(await this.dispatchCreateTree(term));
            }
        }
    }
</script>