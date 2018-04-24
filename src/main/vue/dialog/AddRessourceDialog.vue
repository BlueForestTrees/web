<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Ajouter une ressource'" :icon="'add'"
                 @focus="$refs.lookup.focus()" @esc="close" @enter="validate" @show="show">
        <template slot-scope="dialog">
            <v-card-title primary-title>
                {{subtitle}}
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
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";

    export default {
        name: 'add-ressource-dialog',
        data() {
            return {
                Dial: Dial,
                selection: [],
                editing: false
            }
        },
        components: {Lookup, MainDialog},
        computed: {
            title: function () {
                return "Ajouter";
            },
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            subtitle: function () {
                return "Ajouter une ressource à " + (this.tree && this.tree.trunk.name);
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