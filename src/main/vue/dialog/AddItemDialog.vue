<template>
    <main-dialog :dialog="Dial.ADD_ITEM" @focus="$refs.lookup.focus()" @esc="close" @enter="validate" ref="dialog"
                 @show="show">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Ajouter
                </v-card-title>
                <v-card-text>
                    <v-chip v-for="(item,idx) in selection" :key="item._id" close @input="unselect(idx)">
                        {{item.trunk.name}}
                    </v-chip>
                    <lookup @select="select" cancreate ref="lookup"/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="primary" @click="close">Annuler</v-btn>
                    <v-btn flat @click="validate">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";
    import {validateItem} from "../../const/items";

    export default {
        name: 'add-item-dialog',
        data() {
            return {
                Dial: Dial,
                selection: [],
                editing: false
            }
        },
        components: {Lookup, MainDialog},
        computed: {
            tree: function () {
                return this.$refs.dialog.data.tree;
            }
        },
        methods: {
            ...mapActions({
                dispatchAddLinks: On.ADD_LINKS
            }),
            select(item) {
                this.selection.push(item);
            },
            unselect(idx) {
                this.selection.splice(idx, 1);
            },
            validate() {
                this.dispatchAddLinks({
                    tree: this.tree,
                    [this.$refs.dialog.data.item]: this.selection
                });
                this.close();
            },
            show() {
                this.selection = []
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>