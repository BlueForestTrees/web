<template>
    <v-avatar class="elevation-3 ma-2 hand" size="32px" :style="{backgroundColor:user.color}" @click="$emit('click')">
        <span :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</span>
    </v-avatar>
</template>

<script>
    import {initiales, overcolor} from "../../services/calculations"

    export default {
        name: "Badge",
        props: ["user"],
        methods: {
            overcolor, initiales,
        }
    }
</script>

<style scoped>

</style>