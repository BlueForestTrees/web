<template>
    <v-container>
        <info :key="info.path" v-for="info in infos" :path="info.path"/>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Info from "../pub/Info"

    export default {
        name: "my-infos",
        components: {Info},
        props: ['user'],
        data: () => ({
            infos: null
        }),
        mounted() {
            this.refresh()
        },
        methods: {
            ...mapActions({
                getUserInfos: On.GET_USER_INFOS
            }),
            async refresh() {
                this.infos = await this.getUserInfos(this.user._id)
            },
            select(info) {
                console.log(info)
            }
        }
    }
</script>