<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-3">
                    <img src="img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
                    <img src="img/blue.svg" style="width:20%">
                    <img src="img/forest.svg" style="width:28%">
                    <v-card-text>
                        <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                            <v-text-field prepend-icon="person" type="text" label="Mail" autocomplete="username" v-model="login" required
                                          :rules="[rules.required]"/>
                            <v-text-field prepend-icon="lock" type="password" label="Mot de passe" autocomplete="new-password"
                                          v-model="password" required :rules="[rules.required]"/>
                            <v-text-field prepend-icon="lock" type="password" label="Mot de passe" autocomplete="new-password"
                                          v-model="repeatedPassword" required
                                          :rules="[rules.required]"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <router-link to="/login">Se connecter</router-link>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="validate">Inscription</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {required} from "../services/rules";
    import {mapActions} from "vuex";
    import On from "../const/on";
    import router from "vue-router";

    export default {
        components: {},
        mixins: [],
        data: function () {
            return {
                valid: null,
                login: null,
                password: null,
                repeatedPassword: null,
                rules: {
                    required
                }
            }
        },
        methods: {
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