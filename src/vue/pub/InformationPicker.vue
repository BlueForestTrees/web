<template>
    <my-infos :user="userOnly && user" @select="add"/>
</template>

<script>
    import MyInfos from "../home/MyInfos"
    import {mapState} from "vuex"

    export default {
        name: "information-picker",
        props: ["value"],
        components: {MyInfos},
        data: () => ({
            userOnly: true,
        }),
        computed: {
            ...mapState(['user'])
        },
        methods: {
            add(item) {
                if (this.value) {
                    this.$emit('save', [...this.value, item._id])
                } else {
                    this.$emit('save', [item._id])
                }
            }
        }
    }
</script>