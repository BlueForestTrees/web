<template>
    <card>
        <span slot="content">
            <img style="width:20%;padding-top:1em;padding-left:1em;" src="/img/logo.svg">
            <v-container>
                    <v-card-actions>
                        <v-spacer/>
                        <h1>Confirmer l'inscription</h1>
                        <v-spacer/>
                    </v-card-actions>
                    <v-card-text>
                        <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                            <v-text-field prepend-icon="person" type="text" placeholder="prénom nom"
                                          label="Nom complet"
                                          v-model="fullname" required autofocus
                                          :rules="[nameRequired]" :validate-on-blur="true"
                            />
                            <v-text-field prepend-icon="lock" name="password" label="Mot de passe"
                                          :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                                          :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"
                                          autocomplete="current-password" v-model="password" required
                                          :rules="[validPassword]"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="validate" :disabled="!valid">Suivant<v-icon>navigate_next</v-icon></v-btn>
                    </v-card-actions>
                </v-container>
        </span>
    </card>
</template>

<script>
    import Card from "./layout/Card";
    import On from "../const/on";
    import {mapActions} from 'vuex';
    import {GO} from "../const/go";

    export default {
        name: 'confirmation',
        props: ['token'],
        components: {Card},
        data: function () {
            return {
                showPwd: false,
                valid: null,
                fullname: null,
                password: null
            }
        },
        methods: {
            ...mapActions({confirm: On.CONFIRM_SUSCRIBE, close:On.GO_HOME}),
            nameRequired: value => !!value || 'Veuillez indiquer votre nom complet.',
            validPassword: value => !!value || "Veuillez choisir un mot de passe",
            validate: async function () {
                this.$refs.form.validate();
                if (this.valid) {
                    await this.confirm({token: this.token, fullname: this.fullname, password: this.password});
                    this.close();
                }
            }
        },
    }
</script>