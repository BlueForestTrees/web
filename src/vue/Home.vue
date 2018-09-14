<template>
    <v-container>
        <owned/>
        <message/>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import Message from "./Message"

    export default {
        components: {Message, Owned}
    }
</script>