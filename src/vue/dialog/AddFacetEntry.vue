<template>
    <card>
        <v-toolbar class="elevation-0" color="primary" dark>
            <v-icon>add</v-icon>
            <v-toolbar-title>Créer un nouveau type de propriété</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <color-picker v-model="color"/>
                <v-text-field :rules="[length2min]" label="Nom du type de propriété" required :value="name" @input="setName"></v-text-field>
                <grandeur-select v-model="grandeur"/>
            </v-form>
        </v-container>
        <v-layout row>
            <v-spacer/>
            <v-btn color="primary" @click="validate">OK</v-btn>
        </v-layout>
    </card>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapMutations, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import GrandeurSelect from "../common/GrandeurSelect"
    import {length2min} from "../../services/rules"
    import ColorPicker from "../common/ColorPicker"
    import {createStringObjectId} from "../../services/calculations"
    import Card from "../common/Card"
    import Connected from "../mixin/Connected"
    import Do from "../../const/do"

    export default {
        name: 'add-facet-entry',
        mixins: [Connected],
        data() {
            return {
                Dial: Dial,
                valid: false,
                color: null,
                grandeur: null
            }
        },
        components: {
            Card,
            ColorPicker,
            GrandeurSelect
        },
        computed: {
            ...mapState({
                name: s => s.nav.tree.facet.addFilter
            })
        },
        methods: {
            length2min,
            ...mapActions({
                createFacetEntry: On.CREATE_FACET_ENTRY,
                snack: On.SNACKBAR
            }),
            ...mapMutations({
                setName: Do.SET_TREE_FACET_FILTER
            }),
            validate: function () {
                this.$refs.form.validate()
                if (this.valid) {
                    this.createFacetEntry({
                        _id: createStringObjectId(),
                        color: this.color,
                        name: this.name,
                        g: this.grandeur.key
                    })
                        .then(() => this.snack({text: `Le type de propriété "${this.name}" a été crée`}))
                        .then(() => this.focus())
                        .then(() => this.$router.go(-1))
                }
            },
            close: function () {
                this.$refs.dialog.close()
            },
            focus: function () {
                this.grandeur = null
                this.$nextTick(() => this.$refs.nom.focus())
            }
        }
    }
</script>