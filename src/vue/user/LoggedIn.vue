<template>
    <v-menu v-if="user">
        <v-avatar slot="activator" size="32px" :style="{backgroundColor:user.color}" class="ml-2">
            <span :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</span>
        </v-avatar>
        <v-list two-line>
            <v-list-tile @click="">
                <v-list-tile-avatar size="64px" style="padding-right: 1em">
                    <v-avatar slot="activator" size="64px" :style="{backgroundColor:user.color}"><h1
                            :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</h1></v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.fullname}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.mail}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-btn outline block class="elevation-0" @click="logout" v-if="user">Déconnexion</v-btn>
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
    import {mapState, mapActions} from "vuex"
    import LoginSuscribeList from "../common/LoginSuscribeList"
    import On from "../../const/on"
    import {initiales, overcolor} from "../../services/calculations"

    export default {
        name: "logged-in",
        components: {LoginSuscribeList},
        computed: {
            ...mapState(['user'])
        },
        methods:{
            overcolor, initiales,
            ...mapActions({logout: On.LOGOUT})
        }
    }
</script>