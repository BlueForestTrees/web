<template>
    <main-dialog :dialog="Dial.ADD_IMPACT_ENTRY" title="Nouvelle catégorie d'impact" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <color-picker v-model="color"/>
                <v-text-field ref="nom" label="Nom" required :rules="[length2min]" v-model="name"/>
                <grandeur-select v-model="grandeur"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {Dial} from "../../const/dial"
    import GrandeurSelect from "../common/GrandeurSelect"
    import {length2min} from "../../services/rules"
    import closable from "../mixin/Closable"
    import ColorPicker from "../common/ColorPicker"

    export default {
        mixins: [closable],
        name: 'add-impact-entry-dialog',
        data() {
            return {
                Dial,
                valid: false,
                color: null,
                name: null,
                grandeur: null,
            }
        },
        components: {
            ColorPicker,
            GrandeurSelect,
            MainDialog
        },
        props: ['data'],
        methods: {
            length2min,
            ...mapActions({"createImpactEntry": On.CREATE_IMPACT_ENTRY}),
            validate: function () {
                this.$refs.form.validate()
                if (this.valid) {
                    this.createImpactEntry({color:this.color, name: this.name, grandeur: this.grandeur.key})
                    this.close()
                }
            },
            focus() {
                this.name = null
                this.grandeur = null
                this.$nextTick(() => this.$refs.nom.focus())
            }
        }
    }
</script>