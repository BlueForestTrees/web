<template>
    <main-dialog :dialog="Dial.FEEDBACK" :title="'Votre avis compte!'" ref="dialog" icon="add_alert"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                <v-text-field type="mail" label="mail" v-model="mail" required :rules="[rules.required, rules.email]"/>
                <v-textarea type="text" label="commentaire" v-model="message" required :rules="[rules.required, rules.minlength, rules.maxlength]" counter="250"/>
            </v-form>
        </v-card-text>

        <v-alert :value="!!hasAlert" type="error">Votre message n'a pas été envoyé. Réessayez plus tard.</v-alert>

    </main-dialog>
</template>

<script>
    import closable from "../mixin/Closable";
    import {Dial} from "../../const/dial";
    import MainDialog from "./MainDialog";
    import {mapActions} from "vuex";
    import On from "../../const/on";
    import {required} from "../../services/rules";

    export default {
        name: 'feedback-dialog',
        components: {MainDialog},
        mixins: [closable],
        data: function () {
            return {
                Dial,
                mail: null,
                message: null,
                valid: null,
                done: false,
                rules: {
                    required,
                    email: (value) => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'c\'est une addresse mail?';
                    },
                    minlength: value => !value || value.length >= 10 || "Faites un message plus long s'il vous plaît :)",
                    maxlength: value => !value || value.length <= 250 || "Un peu plus court s'il vous plaît :) :)"
                },
                hasAlert: false
            }
        },
        methods: {
            ...mapActions({sendFeedback: On.SEND_FEEDBACK}),
            validate: async function () {
                this.$refs.form.validate();
                if (this.valid) {
                    this.sendFeedback({mail: this.mail, message: this.message})
                        .then(() => this.close())
                        .catch(() => this.hasAlert = true);
                }
            },
            focus: function () {
                this.$refs.form.reset();
                this.hasAlert = false;
            },
        }
    }
</script>