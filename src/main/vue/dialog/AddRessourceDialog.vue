<template>
    <main-dialog :dialog="Dial.RESSOURCE" @focus="$refs.lookup.focus()" @esc="close" @enter="validate" ref="dialog">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Ajouter des ressource
                </v-card-title>
                <v-card-text>

                    <v-chip v-for="(root,idx) in roots" :key="root._id" close @input="unselect(idx)">
                        {{root.name}}
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
        data() {
            return {
                Dial: Dial,
                roots: [],
                editing: false
            }
        },
        components: {Lookup, MainDialog},
        methods: {
            ...mapActions({
                dispatchAddRessources: On.ADD_ROOTS
            }),
            select(root) {
                this.roots.push(root);
            },
            unselect(idx) {
                this.roots.splice(idx, 1);
            },
            validate() {
                this.dispatchAddRessources({
                    tree: this.$refs.dialog.data.parentRessource,
                    roots: this.roots
                });
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>