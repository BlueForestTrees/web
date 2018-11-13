<template>
    <v-container>


        <v-window v-model="window">
            <v-window-item key="i"><plan-intro/></v-window-item>
            <v-window-item key="c"><plan-constat/></v-window-item>
            <v-window-item key="b"><plan-besoin/></v-window-item>
            <v-window-item key="f"><plan-func/></v-window-item>
            <v-window-item key="t"><plan-tech/></v-window-item>
        </v-window>
        <v-item-group v-model="window" class="mt-4" mandatory tag="v-flex">
            <v-layout row justify-center>
                <v-item key="bi"><div slot-scope="{ active, toggle }"><v-btn :input-value="active" icon @click="toggle"><v-icon>lens</v-icon></v-btn></div></v-item>
                <v-item key="bb"><div slot-scope="{ active, toggle }"><v-btn :input-value="active" icon @click="toggle"><v-icon>lens</v-icon></v-btn></div></v-item>
                <v-item key="bc"><div slot-scope="{ active, toggle }"><v-btn :input-value="active" icon @click="toggle"><v-icon>lens</v-icon></v-btn></div></v-item>
                <v-item key="bf"><div slot-scope="{ active, toggle }"><v-btn :input-value="active" icon @click="toggle"><v-icon>lens</v-icon></v-btn></div></v-item>
                <v-item key="bt"><div slot-scope="{ active, toggle }"><v-btn :input-value="active" icon @click="toggle"><v-icon>lens</v-icon></v-btn></div></v-item>
            </v-layout>
        </v-item-group>


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push({name:GO.HOME})">entrer
            </v-btn>
        </v-card-actions>

        <messages v-if="nav.rightMenuVisible"/>
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
    import PlanIntro from "./Plan0Intro"
    import PlanConstat from "./Plan1Constat"
    import PlanBesoin from "./Plan2Besoin"
    import PlanFunc from "./Plan3Fonc"
    import PlanTech from "./Plan4Tech"

    export default {
        name: "plan",
        components: {PlanTech, PlanFunc, PlanBesoin, PlanConstat, PlanIntro, ConnectToContinueDialog, Card, Messages},
        data() {
            return {
                GO,
                window: null,
                c2: {title: "Le constat - participez", filter: {type: "constat#2"}},
                b1: {title: "Les besoins - participez", filter: {type: "besoin#2"}},
                f1: {title: "Les fonctions - participez", filter: {type: "fonction#2"}},
                t1: {title: "Technique - participez", filter: {type: "Technique#2"}}
            }
        },
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

    a {
        text-decoration: none;
    }

    .subtitle {
        margin-top: 1em;
        margin-left: 0.3em;
    }

    .sup {
        font-size: small;
    }
</style>