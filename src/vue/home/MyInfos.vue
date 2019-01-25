<template>
    <v-container>
        <template v-if="user">
            <v-card>
                <v-list three-lines v-if="items.length">
                    <template v-for="(info, i) in items">
                        <info-tile :info="info" @click="select(info)"/>
                        <v-divider v-if="i + 1 < items.length" :key="i"></v-divider>
                    </template>
                </v-list>
                <v-card-text v-else-if="loaded" class="text-md-center">
                    <p>Vous n'avez pas d'informations.</p>
                    <p>Vous pouvez créer des informations avec le menu de gauche.</p>
                </v-card-text>
                <loader v-else/>
            </v-card>
        </template>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Info from "../pub/Info"
    import Loader from "../loader/Loader"
    import {GO} from "../../const/go"
    import InfoTile from "../pub/InfoTile"

    export default {
        name: "my-infos",
        components: {InfoTile, Loader, Info},
        props: ['user'],
        data: () => ({
            GO,
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
                this.items = await this.getUserInfos(this.user._id)
                this.loaded = true
            },
            select(info) {
                console.log(info)
            }
        }
    }
</script>