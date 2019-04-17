<template>
    <v-menu v-if="user">

        <badge slot="activator" :user="user"/>

        <v-list>
            <v-list-tile @click="goto(GO.USER)">
                <user-icon :user="user"/>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.fullname}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.mail}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.TEAM)">
                <v-list-tile-avatar>
                    <v-icon color="primary">group</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Equipes</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.MESSAGE)">
                <v-list-tile-avatar>
                    <v-icon color="primary">chat</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Messagerie</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="logout">
                <v-list-tile-avatar>
                    <v-icon>power_off</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>Déconnexion</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
    <v-menu v-else>
        <v-btn slot="activator" icon dense>
            <v-icon>person</v-icon>
        </v-btn>
        <login-suscribe-list style="width: 17em"/>
    </v-menu>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import LoginSuscribeList from "../common/LoginSuscribeList"
    import On from "../../const/on"
    import {initiales, overcolor} from "../../services/calculations"
    import {GO} from "../../const/go"
    import UserIcon from "./UserIcon"
    import Badge from "./Badge"

    export default {
        name: "logged-in",
        data: () => ({GO}),
        components: {Badge, UserIcon, LoginSuscribeList},
        computed: {
            ...mapState(['user'])
        },
        methods: {
            ...mapActions({logout: On.LOGOUT, goto: On.GO_TO})
        }
    }
</script>