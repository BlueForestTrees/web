<template>
    <div v-if="info">
        <eq-show v-if="info && info.type === 'eq'" :info="info"/>
        <info v-else-if="info && info.type === 'gr'" v-for="id in info.items" :_id="id" :key="id"></info>
    </div>
    <v-container v-else>
        <v-card>
            <v-layout row align-center justify-center style="height:15em">
                <loader/>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import OpenMessage from "../common/OpenMessage"

    const EqShow = () => import(/* webpackChunkName: "EqShow"*/ "./Eq")

    export default {
        name: "info",
        components: {OpenMessage, Loader, EqShow},
        props: ['path', '_id'],
        data: () => ({
            info: null
        }),
        methods: {
            ...mapActions({getInfo: On.GET_INFO}),
            async refresh() {
                try {
                    this.info = await this.getInfo(this.path ? {path: this.path} : {_id: this._id})
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