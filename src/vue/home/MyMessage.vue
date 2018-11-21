<template>
    <v-card class="ma-1">
        <v-card-text v-if="user" class="text-md-center">
            <v-list>
                <v-list-tile v-for="m in messages" :key="m._id" @click="">
                    il y a {{deltaTime(m.modifDate || m.creationDate)}} - {{m.message}}
                </v-list-tile>
            </v-list>
            <span v-if="messages.length === 0">
                <p>Vous n'avez pas encore écrit de message.</p>
                <p>Vous pouvez laisser des messages dans l'application avec ce type de bouton:</p>
            </span>
            <v-layout column align-center>
                <open-message :section="secs.MESSAGE"/>
            </v-layout>
        </v-card-text>
        <v-container v-else>Connectez-vous pour voir vos messages.</v-container>
    </v-card>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"
    import On from "../../const/on"
    import {deltaTime} from "../../services/calculations"

    export default {
        name: 'my-messages',
        components: {OpenMessage},
        data() {
            return {
                secs
            }
        },
        computed: {
            ...mapState({user: 'user', messages: "myMessages"}),
        },
        mounted() {
            this.refreshMessages()
        },
        methods: {
            ...mapActions({refreshMessages: On.REFRESH_MY_MESSAGES}),
            deltaTime
        }
    }
</script>