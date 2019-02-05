<template>
    <card>
        <v-toolbar class="elevation-0" color="primary" dark>
            <v-icon>add</v-icon>
            <v-toolbar-title>Créer un nouveau type d'impact</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <color-picker v-model="color"/>
                <v-text-field ref="nom" label="Nom" required :rules="[length2min]" :value="name" @input="setName"></v-text-field>
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
    import {mapActions, mapState, mapMutations} from "vuex"
    import {Dial} from "../../const/dial"
    import GrandeurSelect from "../common/GrandeurSelect"
    import {length2min} from "../../services/rules"
    import ColorPicker from "../common/ColorPicker"
    import {createStringObjectId} from "../../services/calculations"
    import Card from "../common/Card"
    import Connected from "../mixin/Connected"
    import Do from "../../const/do"

    export default {
        name: 'add-impact-entry',
        mixins: [Connected],
        data() {
            return {
                Dial,
                valid: false,
                color: null,
                grandeur: null,
            }
        },
        components: {
            Card,
            ColorPicker,
            GrandeurSelect
        },
        computed: {
            ...mapState({
                name: s => s.nav.tree.impact.addFilter
            })
        },
        methods: {
            length2min,
            ...mapActions({
                createImpactEntry: On.CREATE_IMPACT_ENTRY,
                snack: On.SNACKBAR
            }),
            ...mapMutations({
                setName: Do.SET_TREE_IMPACT_FILTER
            }),
            validate: function () {
                this.$refs.form.validate()
                if (this.valid) {
                    this.createImpactEntry({
                        _id: createStringObjectId(),
                        color: this.color,
                        name: this.name,
                        g: this.grandeur.key
                    })
                        .then(() => this.snack({text: `Le type d'impact "${this.name}" a été crée`}))
                        .then(() => this.focus())
                        .then(() => this.$router.go(-1))
                }
            },
            focus() {
                this.grandeur = null
                this.$nextTick(() => this.$refs.nom.focus())
            }
        }
    }
</script>