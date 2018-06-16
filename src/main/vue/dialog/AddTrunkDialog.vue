<template>
    <main-dialog :dialog="Dial.ADD_TRUNK" :title="'Ajouter'" @esc="close" @enter="validate" ref="dialog">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <span v-if="destination">
                    <destination :tree="destination"/>
                </span>
                <span v-else>
                    <color-picker v-model="color"/>
                    <v-text-field ref="nom" label="Nom" :rules="[length2min]" required v-model="name"/>
                    <grandeur-select v-model="grandeur" label="La quantité est un(e)..."/>
                </span>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import closable from "../mixin/Closable";
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";
    import {find} from 'lodash';
    import {getGrandeur} from 'trees-units'
    import {length2min} from "../../services/rules";
    import Do from "../../const/do";
    import Destination from "../common/Destination";
    import Ressources from "../tree/Ressources";
    import {getRandomColor} from "../../services/calculations";
    import ColorPicker from "../common/ColorPicker";

    export default {
        name:'add-trunk-dialog',
        mixins: [closable],
        components: {ColorPicker, Ressources, Destination, UnitSelect, GrandeurSelect, MainDialog},
        data() {
            return {
                Dial: Dial,
                valid: false,
                color: null,
                name: null,
                grandeur: null,
                qt: null,
                unit: null
            }
        },
        computed: {
            ...mapState({destination: state => state.dialogs[Dial.ADD_TRUNK].data.tree})
        },
        methods: {
            ...mapActions({
                createAndOpen: On.CREATE_AND_OPEN_TREE
            }),
            ...mapMutations({
                showDialog: Do.SHOW_DIALOG
            }),
            async validate() {
                const tree = await this.createAndOpen({color: this.color, name: this.name, grandeur: this.grandeur.key});
                this.close();
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree}});
            },

            length2min, getRandomColor
        }
    }
</script>