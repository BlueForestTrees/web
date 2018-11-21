<template>
    <card>
        <v-toolbar class="elevation-0" color="primary" dark>
            <v-icon>add</v-icon>
            <v-toolbar-title>Créer un nouveau type de propriété</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <color-picker v-model="color"/>
                <v-text-field :rules="[length2min]" label="Nom du type de propriété" required v-model="name"></v-text-field>
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
    import {mapActions} from "vuex"
    import {Dial} from "../../const/dial"
    import GrandeurSelect from "../common/GrandeurSelect"
    import {length2min} from "../../services/rules"
    import ColorPicker from "../common/ColorPicker"
    import {createStringObjectId} from "../../services/calculations"
    import Card from "../common/Card"
    import Connected from "../mixin/Connected"

    export default {
        name: 'add-facet-entry',
        mixins: [Connected],
        data() {
            return {
                Dial: Dial,
                valid: false,
                color: null,
                name: null,
                grandeur: null
            }
        },
        components: {
            Card,
            ColorPicker,
            GrandeurSelect
        },
        props: ['data'],
        methods: {
            length2min,
            ...mapActions({
                createFacetEntry: On.CREATE_FACET_ENTRY,
                snack: On.SNACKBAR
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
                }
            },
            close: function () {
                this.$refs.dialog.close()
            },
            focus: function () {
                this.name = null
                this.grandeur = null
            }
        }
    }
</script>