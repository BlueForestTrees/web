<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'"
                 @esc="close" @enter="validate" @focus="focus">
        <template slot-scope="dialog">
            <v-card-text>
                <destination :tree="tree"/>

                <v-select
                        label="Nom..."
                        autocomplete chips required cache-items
                        :loading="loading"
                        :items="autocompleteItems"
                        :search-input.sync="itemNamepart"
                        v-model="selectedItemId"
                        item-text="name" item-value="_id"
                />

                <!--<lookup @select="select" cancreate ref="lookup"/>-->
            </v-card-text>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";
    import Destination from "../common/Destination";
    import {find} from 'lodash';

    export default {
        name: 'add-ressource-dialog',
        data() {
            return {
                Dial: Dial,
                selection: [],
                autocompleteItems: [],
                itemNamepart: null,
                loading: false,
                selectedItemId: null,
            }
        },
        components: {Destination, Lookup, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            selectedItem: function () {
                return this.selectedItemId && find(this.autocompleteItems, {_id: this.selectedItemId});
            }
        },
        methods: {
            ...mapActions({
                dispatchAddLinks: On.ADD_LINKS
            }),
            ...mapActions({
                dispatchSearchTree: On.SEARCH_TREE
            }),
            async searchRessource(namepart) {
                if (namepart)
                    this.autocompleteItems = await this.dispatchSearchTree({namepart});
            },
            // select(item) {
            //     this.selection.push(item);
            // },
            // unselect(idx) {
            //     this.selection.splice(idx, 1);
            // },
            validate() {
                // this.dispatchAddLinks({
                //     tree: this.tree,
                //     roots: this.selection
                // });
                this.close();
            },
            focus() {
                // this.selection = []
            },
            close: function () {
                // this.$refs.dialog.close();
            // },
            // watch: {
                // itemNamepart(val) {
                    // this.loading = true;
                    // this.searchRessource(val);
                    // this.loading = false;
                // }
            }
        }
    }
</script>