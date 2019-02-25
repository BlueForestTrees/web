<template>
    <v-container v-if="info">
        <template v-if="info && info.type === 'gr'">
            <info-menu :info="info"/>
            <info v-for="id in info.items" :_id="id" :key="id"/>
        </template>
        <v-card class="elevation-3">
            <eq-show v-if="info && info.type === 'eq'" :info="info"/>
            <alt-show v-else-if="info && info.type === 'alt'" :info="info"/>
            <comp-show v-else-if="info && info.type ==='comp'" :info="info"/>
        </v-card>

    </v-container>
    <v-container v-else>
        <v-layout row align-center justify-center style="height:10em">
            <loader v-if="loading"/>
            <p v-else>Cette info n'existe plus :(</p>
        </v-layout>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import InfoBase from "./InfoBase"
    import InfoMenu from "./InfoMenu"

    const EqShow = () => import(/* webpackChunkName: "EqShow"*/ "./Eq")
    const AltShow = () => import(/* webpackChunkName: "AltShow"*/ "./Alt")
    const CompShow = () => import(/* webpackChunkName: "CompShow"*/ "./CompShow")

    export default {
        name: "info",
        components: {InfoMenu, CompShow, InfoBase, Loader, EqShow, AltShow},
        props: ['path', '_id'],
        data: () => ({
            info: null,
            loading: true
        }),
        methods: {
            ...mapActions({getInfo: On.GET_INFO}),
            async refresh() {
                try {
                    this.loading = true
                    this.info = await this.getInfo(this.path ? {path: this.path} : {_id: this._id})
                    this.loading = false
                } catch (e) {
                    console.error(e)
                }
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
    }
</script>