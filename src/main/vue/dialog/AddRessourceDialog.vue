<template>
    <main-dialog v-if="trunk" :dialog="Dial.RESSOURCE" @focus="$refs.lookup.focus()" @esc="close" @enter="validate"
                 ref="dialog" @show="show">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Ajouter à {{trunk.name}}
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

    export default {
        name: 'add-ressource-dialog',
        props: ['tree'],
        data() {
            return {
                Dial: Dial,
                selection: [],
                editing: false
            }
        },
        components: {Lookup, MainDialog},
        computed: {
            trunk: function () {
                return this.tree.trunk;
            }
        },
        methods: {
            ...mapActions({
                dispatchAddRessources: On.ADD_ROOTS
            }),
            select(ressource) {
                this.selection.push(ressource);
            },
            unselect(idx) {
                this.selection.splice(idx, 1);
            },
            validate() {
                this.dispatchAddRessources({
                    tree: this.tree,
                    roots: this.selection
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