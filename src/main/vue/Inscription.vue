<template>
    <card>
        <span slot="content">
            <img src="img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
            <img src="img/blue.svg" style="width:20%">
            <img src="img/forest.svg" style="width:28%">
            <v-card-text>
                <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                    <!--<v-text-field prepend-icon="person" name="pseudo" label="Pseudo" type="text" autofocus-->
                                  <!--autocomplete="username" v-model="pseudo" required :rules="[rules.required]"-->
                    <!--&gt;</v-text-field>-->
                    <v-text-field prepend-icon="mail" type="text" label="Mail" autocomplete="username"
                                  v-model="login" required autofocus
                                  :rules="[rules.required]" :validate-on-blur="true"
                    />
                    <v-text-field prepend-icon="lock" type="password" label="Mot de passe" autocomplete="new-password"
                                  v-model="password" required :rules="[rules.required]" :validate-on-blur="true"
                                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                  @click:append="() => showPassword = !showPassword"
                                  :type="showPassword ? 'text' : 'password'"/>
                    <v-text-field prepend-icon="lock" type="password" label="Confirmation du mot de passe" autocomplete="new-password"
                                  v-model="repeatedPassword" required
                                  :rules="[rules.required, sameAsPassword]" :validate-on-blur="true"
                                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                  @click:append="() => showPassword = !showPassword"
                                  :type="showPassword ? 'text' : 'password'"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <router-link to="/login">Se connecter</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="validate">Inscription</v-btn>
            </v-card-actions>
        </span>
    </card>
</template>

<script>
    import {required} from "../services/rules";
    import {mapActions} from "vuex";
    import On from "../const/on";
    import Card from "./layout/Card";

    export default {
        components: {Card},
        mixins: [],
        data: function () {
            return {
                valid: null,
                pseudo: null,
                login: null,
                password: null,
                repeatedPassword: null,
                rules: {
                    required
                },
                showPassword: false
            }
        },
        methods: {
            sameAsPassword: function (value) {
                return value === this.password || "Confirmation de mot de passe incorrecte.";
            },
            validate: async function () {
                this.$refs.form.validate();
                if (this.valid) {
                    await this.suscribe({login: this.login, password: this.password});
                    this.$router.push('/login')
                }
            },
            ...mapActions({suscribe: On.SUSCRIBE})
        }
    }
</script>