<template>

    <v-menu offset-y style="width: 100%">

        <v-text-field ref="termInput" @input="search" :value="term" slot="activator" prepend-icon="search" placeholder="Recherche"/>

        <v-list v-if="allowCreate || hasResults">
            <v-list-tile v-for="item in results" :key="item._id" @click="select(item)">
                <v-list-tile-avatar>
                    <v-icon>assignment</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="allowCreate && hasResults"/>
            <v-list-tile v-if="allowCreate" @click="create(term)">
                <v-list-tile-avatar>
                    <v-icon>add</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Créer "{{term}}"...</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import {mapActions} from 'vuex';
    import {On} from "../../const/on";

    export default {
        props: {cancreate: Boolean},
        data() {
            return {
                term: null,
                results: null,
                searching: null
            }
        },
        computed: {
            searchOccur: function () {
                return this.term && !this.searching && !!this.results
            },
            noResults: function () {
                return _.isEmpty(this.results)
            },
            hasResults: function () {
                return !!(this.searchOccur && !this.noResults)
            },
            exactMatch: function () {
                return !!_.find(this.results, {name: this.term})
            },
            allowCreate: function () {
                return this.cancreate && !!(this.searchOccur && (this.noResults || !this.exactMatch))
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH,
                dispatchCreate: On.CREATE_TRUNK
            }),
            focus() {
                this.$refs.termInput.focus();
            },
            async search(value) {
                this.term = value;
                if (value) {
                    this.searching = true;
                    try {
                        this.results = await this.dispatchSearch(value);
                    } finally {
                        this.searching = false;
                    }
                }
            },
            select(item) {
                this.$emit('select', item);
                this.clearSearch();
            },
            clearSearch() {
                this.term = null;
                this.results = null;
                this.searching = null;
            },
            create: async function (term) {
                this.select(await this.dispatchCreate(term));
            }
        }
    }
</script>