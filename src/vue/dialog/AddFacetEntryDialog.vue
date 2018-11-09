<template>
    <main-dialog :dialog="Dial.FACET_ENTRY" ref="dialog" :title="'Nouveau type de propriété'"
                 @esc="close" @enter="validate" @focus="focus">
        <v-card-text>
            <color-picker v-model="color"/>
            <v-text-field :rules="[length2min]" label="Nom du type de propriété" required v-model="name"/>
            <grandeur-select v-model="grandeur"/>
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
    import ColorPicker from "../common/ColorPicker"
    import {createStringObjectId} from "../../services/calculations"

    export default {
        name: 'add-facet-entry-dialog',
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
            ColorPicker,
            GrandeurSelect,
            MainDialog
        },
        props: ['data'],
        methods: {
            length2min,
            ...mapActions({
                createFacetEntry: On.CREATE_FACET_ENTRY,
                snack: On.SNACKBAR
            }),
            validate: function () {
                this.createFacetEntry({
                    _id: createStringObjectId(),
                    color: this.color,
                    name: this.name,
                    g: this.grandeur.key
                }).then(() => this.snack({text: `Le type de propriété "${this.name}" a été crée`}))
                this.close()
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