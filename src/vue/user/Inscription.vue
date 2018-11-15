<template>
    <card>
        <span>

            <img style="width:20%;padding-top:1em;padding-left:1em;" src="img/logo.svg">

            <v-container v-if="!mailSent">
                <v-card-actions>
                    <v-spacer/>
                    <h1>Bienvenue</h1>
                    <v-spacer/>
                </v-card-actions>
                <v-card-text>
                    <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                        <v-text-field prepend-icon="mail" type="text" placeholder="vous@exemple.com"
                                      label="Votre adresse e-mail" autocomplete="username"
                                      v-model="mail" required autofocus
                                      :rules="[mailRequired, validMail]" :validate-on-blur="true"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:GO.LOGIN}">Déjà inscrit</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validate" :disabled="!valid">Inscription<v-icon>navigate_next</v-icon></v-btn>
                </v-card-actions>
            </v-container>
            <v-container v-else>
                <v-card-actions>
                    <v-spacer/>
                    <h1>Consultez vos e-mails</h1>
                    <v-spacer/>
                </v-card-actions>
                Nous avons envoyé un mail contenant un lien de confirmation à l’adresse {{mail}}. Comme il expirera bientôt, veuillez le valider rapidement.
            </v-container>
        </span>


    </card>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Card from "../common/Card"
    import {mailRequired, validMail} from "../../services/rules"
    import {GO} from "../../const/go"

    export default {
        components: {Card},
        mixins: [],
        data: function () {
            return {
                GO,
                valid: null,
                mail: null,
                mailSent: false
            }
        },
        methods: {
            mailRequired,
            validMail,
            validate: async function () {
                this.$refs.form.validate()
                if (this.valid) {
                    await this.wantSuscribe({mail: this.mail})
                    this.mailSent = true
                }
            },
            ...mapActions({wantSuscribe: On.WANT_SUSCRIBE})
        }
    }
</script>