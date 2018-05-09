<template>
    <main-dialog :dialog="Dial.IMPACT_ENTRY" title="Nouveau type d'impact" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-text-field ref="nom" label="Nom" required :rules="[length2min]" v-model="name"/>
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
    import GrandeurSelect from "../common/GrandeurSelect";
    import {length2min} from "../../services/rules";
    import closable from "../mixin/Closable";

    export default {
        mixins: [closable],
        name: 'impact-entry-dialog',
        data() {
            return {
                Dial,
                valid: false,
                name: null,
                grandeur: null,
            }
        },
        components: {
            GrandeurSelect,
            MainDialog
        },
        props: ['data'],
        methods: {
            length2min,
            ...mapActions({"createImpactEntry": On.CREATE_IMPACT_ENTRY}),
            validate: function () {
                this.$refs.form.validate();
                if (this.valid) {
                    this.createImpactEntry({name: this.name, grandeur: this.grandeur.key});
                    this.close();
                }
            },
            focus() {
                this.$refs.form.reset();
                this.$nextTick(() => this.$refs.nom.focus());
            }
        }
    }
</script>