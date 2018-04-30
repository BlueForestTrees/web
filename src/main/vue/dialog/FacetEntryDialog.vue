<template>
    <main-dialog :dialog="Dial.FACET_ENTRY" ref="dialog" :title="'Nouveau type de propriété'" :icon="'add'"
                 @esc="close" @enter="validate" @focus="focus">
        <template slot-scope="props">
            <v-card>
                <v-card-text>
                    <v-text-field label="Nom du type de propriété" required v-model="name"/>
                    <grandeur-select v-model="grandeur"/>
                </v-card-text>
            </v-card>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import GrandeurSelect from "../common/GrandeurSelect";

    export default {
        data() {
            return {
                Dial: Dial,
                valid: false,
                name: null,
                grandeur: null
            }
        },
        components: {
            GrandeurSelect,
            MainDialog
        },
        props: ['data'],
        methods: {
            ...mapActions({"createFacetEntry": On.CREATE_FACET_ENTRY}),
            validate: function () {
                this.createFacetEntry({name: this.name, grandeur: this.grandeur.key});
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            },
            focus: function () {
                this.name = null;
                this.grandeur = null;
            }
        }
    }
</script>