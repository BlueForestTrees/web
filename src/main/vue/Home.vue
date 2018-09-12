<template>
    <v-container>
        <owned/>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import On from "../const/on"
    import {mapActions} from "vuex"

    export default {
        components: {Owned}
    }
</script>