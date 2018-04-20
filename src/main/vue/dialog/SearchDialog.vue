<template>
    <v-dialog v-model="visible" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-icon>search</v-icon>
                <v-toolbar-title>Recherche</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="visible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-layout column>
                    <v-text-field ref="searchInput" autofocus :value="term" @input="search" placeholder="nom, auteur, type, etc."/>
                    <v-list two-line>
                        <template v-for="item in searchResults">
                            <v-divider/>
                            <v-list-tile avatar :key="item.trunk.name" @click="select(item)">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.trunk.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <qt-unit :quantity="item.trunk.quantity"/>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">info</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-layout>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import Lookup from "../common/Lookup";
    import On from "../../const/on";
    import QtUnit from "../common/QtUnit";

    export default {
        name: "search-dialog",
        components: {QtUnit, Lookup},
        props: ['film'],
        data() {
            return {
                term: null,
                searchResults: null,
                searching: null
            }
        },
        computed: {
            ...mapState({nav: 'nav'}),
            visible: {
                get: function () {
                    return this.$store.state.dialogs.search.visible;
                },
                set: function (value) {
                    this.$store.state.dialogs.search.visible = value;
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                dispatchCreateTree: On.CREATE_TRUNK,
                open: On.LOAD_OPEN_TREE
            }),
            focus() {
                this.$refs.searchInput.focus();
            },
            async search(value) {
                this.term = value;
                if (value) {
                    this.searching = true;
                    try {
                        this.searchResults = await this.dispatchSearch(value);
                    } finally {
                        this.searching = false;
                    }
                }
            },
            select(tree) {
                this.open(tree);
                this.visible = false;
                this.clearSearch();
            },
            clearSearch() {
                this.term = null;
                this.searchResults = null;
                this.searching = null;
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    this.$nextTick(this.focus);
                }
            }
        }
    }
</script>