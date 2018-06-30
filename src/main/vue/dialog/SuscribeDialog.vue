<template>
    <main-dialog :dialog="Dial.SUSCRIBE" :title="'Inscription'" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
            <v-text-field type="text" label="mail" autocomplete="username" v-model="login" required :rules="[rules.required]"/>
            <v-text-field type="password" label="mot de passe" autocomplete="new-password" v-model="password" required :rules="[rules.required]"/>
            <v-text-field type="password" label="mot de passe" autocomplete="new-password" v-model="repeatedPassword" required
                          :rules="[rules.required]"/>
        </v-form>
    </main-dialog>
</template>

<script>
    import closable from "../mixin/Closable";
    import {Dial} from "../../const/dial";
    import {required} from "../../services/rules";
    import MainDialog from "./MainDialog";
    import {mapActions} from "vuex";
    import On from "../../const/on";

    export default {
        name: "suscribe-dialog",
        components: {MainDialog},
        mixins: [closable],
        data: function () {
            return {
                Dial,
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
            focus: function () {
                this.$refs.form.reset();
            },
            validate: async function () {
                this.$refs.form.validate();
                if (this.valid) {
                    await this.suscribe({login: this.login, password: this.password});
                    this.close();
                }
            },
            ...mapActions({suscribe: On.SUSCRIBE})
        }
    }
</script>