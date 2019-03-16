<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex>
                        <v-icon @click="escape" class="top-right">close</v-icon>
                        <login-suscribe-list/>
                        <v-list-tile-action-text>{{data.message || "Vous devez être connecté pour continuer."}}</v-list-tile-action-text>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import LoginSuscribeList from "../common/LoginSuscribeList"
    import {Dial} from "../../const/dial"
    import Dialog from "../mixin/Dialog"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Card from "../common/Card"

    export default {
        name: "connect-to-continue-dialog",
        mixins: [Dialog],
        props: {canStay: {type: Boolean, default: false}},
        components: {Card, LoginSuscribeList},
        data() {
            return {
                Dial,
                dialog: Dial.CONNECT_TO_CONTINUE
            }
        },
        methods: {
            ...mapActions({goHome: On.GO_HOME}),
            escape() {
                if (!this.canStay) {
                    this.goHome()
                }
                this.close()
            }
        }
    }
</script>