<template>
    <v-dialog v-model="visible" @keydown.esc="escape" @input="v => v || escape()">
        <login-suscribe-list/>
    </v-dialog>
</template>

<script>
    import LoginSuscribeList from "../common/LoginSuscribeList"
    import {Dial} from "../../const/dial"
    import Dialog from "../mixin/Dialog"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "connect-to-continue-dialog",
        mixins: [Dialog],
        components: {LoginSuscribeList},
        data() {
            return {
                Dial,
                dialog: Dial.CONNECT_TO_CONTINUE
            }
        },
        methods: {
            ...mapActions({goHome: On.GO_HOME}),
            escape() {
                this.goHome()
                this.close()
            }
        }
    }
</script>