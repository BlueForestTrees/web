<template>
    <v-container>
        <v-flex mt-3>
            <owned/>



        </v-flex>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import OpenMessage from "../common/OpenMessage"

    export default {
        components: {OpenMessage, Owned},
    }
</script>