<template>
    <v-container>
        <v-layout row justify-center class="not-too-small">
            <v-text-field solo autofocus v-model="name" class="not-too-half"
                          @input="check"
                          :error-messages="errors"
                          @enter="validate" v-on:keyup.enter="validate">
                <mini-loader v-if="loading" slot="append" :size="20" :width="2"/>
                <v-btn slot="append-outer" :disabled="!!errors.length" @click="validate">Ok</v-btn>
            </v-text-field>
        </v-layout>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import debounce from 'lodash.debounce'
    import MiniLoader from "../loader/miniloader"

    export default {
        name: "path-editor",
        props: ['value'],
        components: {MiniLoader, Loader},
        data: () => ({name: null, valid: false, errors: [], loading: false}),
        methods: {
            check: debounce(function () {
                this.errors = []
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
                if (!this.errors.length)
                    this.$emit("save", this.name)
            },
            ...mapActions({checkAvailable: On.CHECK_NAME_AVAILABLE})
        },
        mounted() {
            this.name = this.value
        }
    }
</script>