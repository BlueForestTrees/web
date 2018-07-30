<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-avatar size="64px" style="padding-right: 1em">
                <v-avatar size="64px"><img style="width: 64px;height:64px" src="/img/logo-rond.svg" alt="BlueForest"></v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Invité</v-list-tile-title>
                <v-list-tile-sub-title>non connecté, lecture seule</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="connect">Connexion</v-btn>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="suscribe">Inscription</v-btn>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {GO} from "../../const/go"

    export default{
        name:"login-suscribe-list",
        methods:{
            suscribe: function () {
                this.$router.push({name: GO.SUSCRIBE})
            },
            connect: function () {
                this.$router.push({name: GO.LOGIN})
            },
        }
    }
</script>