<template>
    <main-dialog :dialog="Dial.CREATE_TREE" @focus="$refs.nom.focus()" :title="'Nouveau produit/service'" @esc="close" @enter="validate" ref="dialog">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-text-field ref="nom" label="Nom" :rules="[length2min]" v-model="name"/>
                <grandeur-select v-model="grandeur"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import closable from "../mixin/Closable";
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";
    import {find} from 'lodash';
    import {getGrandeur} from 'trees-units'

    export default {
        mixins: [closable],
        components: {UnitSelect, GrandeurSelect, MainDialog},
        data() {
            return {
                Dial: Dial,
                valid: false,
                name: null,
                grandeur: null,
                qt: null,
                unit: null
            }
        },
        methods: {
            ...mapActions({
                createAndOpen: On.CREATE_AND_OPEN_TREE
            }),
            validate() {
                this.createAndOpen({name: this.name, grandeur: this.grandeur.key});
                this.close();
            },
            length2min: value => (value && value.trim().length > 1) || "2 caractères minimum",
        }
    }
</script>