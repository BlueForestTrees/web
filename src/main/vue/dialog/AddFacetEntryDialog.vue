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
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import GrandeurSelect from "../common/GrandeurSelect";
    import {length2min} from "../../services/rules";
    import ColorPicker from "../common/ColorPicker";

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
            ...mapActions({"createFacetEntry": On.CREATE_FACET_ENTRY}),
            validate: function () {
                this.createFacetEntry({color: this.color, name: this.name, grandeur: this.grandeur.key});
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