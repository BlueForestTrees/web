<template>
    <main-dialog :dialog="Dial.ADD" @focus="focus" :title="'Nouveau produit/service'" @esc="close" @enter="validate" ref="dialog">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-text-field ref="nom" label="Nom" :rules="[length2min]" required v-model="name"/>
                <grandeur-select v-model="grandeur"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapMutations} from "vuex";
    import {Dial} from "../../const/dial";
    import closable from "../mixin/Closable";
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";
    import {find} from 'lodash';
    import {getGrandeur} from 'trees-units'
    import {length2min} from "../../services/rules";
    import Do from "../../const/do";

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
            ...mapMutations({
                showDialog: Do.SHOW_DIALOG
            }),
            async validate() {
                const tree = await this.createAndOpen({name: this.name, grandeur: this.grandeur.key});
                this.close();
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree}});
            },
            length2min,
            focus() {
                this.$refs.form.reset();
                this.$nextTick(() => this.$refs.nom.focus());
            }
        }
    }
</script>