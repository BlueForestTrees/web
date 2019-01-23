<template>
    <v-container>
        <v-layout row align-center justify-center>
            <v-text-field solo autofocus v-model="name" class="not-too-half" append-icon="save"
                          @input="check"
                          :error-messages="errors"
                          @click:append="validate" @enter="validate" v-on:keyup.enter="validate"
            />
        </v-layout>
        <loader v-if="loading" :width="2" :size="15"/>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import debounce from 'lodash.debounce'

    export default {
        name: "path-checker",
        props: ['path'],
        components: {Loader},
        data: () => ({name: null, valid: false, errors: null, loading: false}),
        methods: {
            check: debounce(function () {
                this.errors = null
                if (this.name) {
                    this.loading = true
                    return this.checkAvailable(this.name)
                        .then(available => {
                            if (!available) {
                                this.errors = ["Déjà pris :("]
                            }
                            this.loading = false
                        })
                } else {
                    this.errors = ["Choisissez un nom"]
                }
            }, 400),
            async validate() {
                await this.check()
                if (!this.errors)
                    this.$emit("save", this.name)
            },
            ...mapActions({checkAvailable: On.CHECK_NAME_AVAILABLE})
        },
        mounted() {
            this.name = this.path
        }
    }
</script>