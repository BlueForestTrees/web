<template>
    <v-menu offset-y style="width: 100%">
        <v-text-field ref="textfield" @input="term = $event" :value="term" slot="activator" light solo prepend-icon="search" placeholder="Recherche"/>
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
    import {Do, On} from "../../store/keys";
    import {mapActions, mapMutations} from 'vuex';

    export default {
        name: "lookup",
        props: ["lookup","cancreate"],
        computed: {
            data: {
                get: function () {
                    console.log(this.cancreate);
                    return this.$store.state.lookups[this.lookup];
                },
            },
            term: {
                get: function () {
                    return this.data.term;
                },
                set: function (value) {
                    this.dispatchTerm({lookup: this.lookup, term: value});
                }
            },
            results: {
                get: function () {
                    return this.data.results;
                }
            },
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
            },
        },
        methods: {
            ...mapActions({
                dispatchTerm: On.UPDATE_LOOKUP_TERM,
                dispatchCreate: On.CREATE_TRUNK
            }),
            ...mapMutations({
                clearSearch: Do.CLEAR_LOOKUP_SEARCH
            }),
            select(item) {
                this.$emit('select', item);
                this.clearSearch(this.lookup);
            },
            create: async function(term) {
                this.select(await this.dispatchCreate(term));
            }
        }
    }
</script>