<template>
    <v-container>
        <v-window v-model="window">
            <v-window-item key="c">
                <plan-constat/>
            </v-window-item>
            <v-window-item key="b">
                <plan-besoin/>
            </v-window-item>
            <v-window-item key="f">
                <plan-func/>
            </v-window-item>
            <v-window-item key="m">
                <plan-model-eco/>
            </v-window-item>
            <v-window-item key="t">
                <plan-tech/>
            </v-window-item>
        </v-window>
        <v-item-group v-model="window" class="mt-4" mandatory tag="v-flex">
            <v-layout row justify-center>
                <v-item key="bb">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bc">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bf">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bm">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bt">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
            </v-layout>
        </v-item-group>

        <connect-to-continue-dialog can-stay/>
    </v-container>
</template>

<script>
    import Messages from "../messages/Messages"
    import {GO} from "../../const/go"
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import Card from "../common/Card"
    import ConnectToContinueDialog from "../dialog/ConnectToContinueDialog"
    import PlanConstat from "./Plan1Constat"
    import PlanBesoin from "./Plan2Besoin"
    import PlanFunc from "./Plan3Fonc"
    import PlanTech from "./Plan4Tech"
    import PlanModelEco from "./Plan4ModelEco"

    export default {
        name: "plan",
        components: {PlanModelEco, PlanTech, PlanFunc, PlanBesoin, PlanConstat, ConnectToContinueDialog, Card, Messages},
        data: () => ({GO, window: null}),
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            showMessages(filter) {
                this.dispatchShowMessage(filter)
            },
            ...mapActions({goHome: On.GO_HOME, dispatchShowMessage: On.SHOW_MESSAGES})
        }
    }
</script>

<style>

    p {
        margin-left: 1.3em
    }

</style>