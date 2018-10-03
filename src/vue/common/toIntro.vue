<template>
    <v-icon large @click="$router.push({name:PLAN_INTRO})" color="primary" style="position:absolute;top:0.3em;right:0.5em">live_help</v-icon>
</template>

<script>
    import {GO as Go} from "../../const/go"

    export default{
        name:"to-intro",
        data() {
            return {
                PLAN_INTRO: Go.PLAN_INTRO
            }
        },
    }
</script>