<template>
    <v-container>
        <template v-if="user">
            <v-card>
                <v-list two-line>
                    <template v-for="(info, i) in items">
                        <v-list-tile @click="$emit('select',info)" avatar>
                            <info-dense :info="info"/>
                        </v-list-tile>
                        <v-divider v-if="i + 1 < items.length" :key="i"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </template>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Info from "../pub/Info"
    import Loader from "../loader/Loader"
    import InfoDense from "./InfoDense"

    export default {
        name: "my-infos",
        components: {InfoDense, Loader, Info},
        props: ['user'],
        data: () => ({
            items: [],
            loaded: false
        }),
        mounted() {
            this.refresh()
        },
        methods: {
            ...mapActions({
                getUserInfos: On.GET_USER_INFOS
            }),
            async refresh() {
                this.loaded = false
                this.items = await this.getUserInfos(this.user && this.user._id)
                this.loaded = true
            }
        }
    }
</script>