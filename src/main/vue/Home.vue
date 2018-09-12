<template>
    <v-container>
        <owned/>
        <v-btn @click="showMessages({type:'global'})"></v-btn>
        <v-btn @click="showMessages({type:'doudou'})"></v-btn>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import On from "../const/on"
    import {mapActions} from "vuex"

    export default {
        components: {Owned},
        methods: {
            ...mapActions({showMessages: On.SHOW_MESSAGES})
        }
    }
</script>