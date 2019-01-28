<template>
    <my-infos :user="userOnly && user" @select="v=>$emit('select', v)"/>
</template>

<script>
    import MyInfos from "../home/MyInfos"
    import {mapState} from "vuex"

    export default {
        name: "information-picker",
        components: {MyInfos},
        data: () => ({
            userOnly: true,
        }),
        computed: {
            ...mapState(['user'])
        }
    }
</script>