<template>
    <main-dialog :dialog="Dial.COMMENT" :title="'Votre avis compte!'" ref="dialog" icon="add_alert"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                <v-text-field type="mail" label="mail" v-model="mail" required :rules="[rules.required, rules.email]"/>
                <v-text-field type="text" label="commentaire" v-model="message" multi-line required :rules="[rules.required, rules.minlength, rules.maxlength]" counter="250"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import closable from "../mixin/Closable";
    import {Dial} from "../../const/dial";
    import MainDialog from "./MainDialog";

    export default {
        name: 'comment-dialog',
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
                    required: (value) => !!value || '',
                    email: (value) => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'c\'est une addresse mail?';
                    },
                    minlength: value => !value || value.length >= 10 || "Faites un message plus long s'il vous plaît :)",
                    maxlength: value => !value || value.length <= 250 || "Un peu plus court s'il vous plaît :) :)"
                }
            }
        },
        methods: {
            validate: function () {
                this.$refs.form.validate();
                if (this.valid) {
                    send({mail: this.mail, message: this.message})
                        .then(v => {
                            if (v.n === 1 && v.ok === 1) {
                                this.close();
                            }
                        });
                }
            },
            focus: function () {
                this.$refs.form.reset();
            },
        }
    }
</script>