<template>

    <v-select label="Recherche" v-bind:items="results" item-text="name" item-value="_id" chips max-height="auto" autocomplete :search-input.sync="term" @change="select">

        <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
                <v-icon>add</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item._id"></v-list-tile-sub-title>
            </v-list-tile-content>
        </template>

    </v-select>

</template>

<script>
    import {On} from "../store/keys";
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'doudou',
        data() {
            return {
                term: null
            }
        },
        watch: {
            term(val) {
                val && this.recherche(val);
            }
        },
        methods: {
            select(item) {
                console.log(item)
            },
            ...mapActions({'recherche': On.UPDATE_SEARCH_TERM})
        },
        computed: {
            ...mapState({
                "results": state => state.search.results
            })
        }
    }
</script>