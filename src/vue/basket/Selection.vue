<template>
    <v-window v-model="tabModel">
        <v-window-item value="search" lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
            <transition-expand>
                <search v-if="tabModel==='search'" @select="select" class="mt-5"/>
            </transition-expand>
        </v-window-item>
        <v-window-item value="mines" lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
            <my-product v-if="tabModel==='mines'" :user="user" @select="select"/>
        </v-window-item>
        <v-window-item value="favoris" lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
            <my-selects v-if="tabModel==='favoris'" :user="user" @select="select"/>
        </v-window-item>
        <v-window-item value="infos" lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
            <my-infos v-if="tabModel==='infos'" :user="user" />
        </v-window-item>
        <!--<v-window-item value="recent" lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">-->
            <!--<my-basket v-if="tabModel==='recent'" @select="select"/>-->
        <!--</v-window-item>-->
    </v-window>
</template>

<script>
    import {mapState} from "vuex"
    import TransitionExpand from "../common/TransitionExpand"

    const Search = () => import(/* webpackChunkName: "MyBasket"*/ "../search/Search")
    const MyBasket = () => import(/* webpackChunkName: "MyBasket"*/ "../home/MyBasket")
    const MyProduct = () => import(/* webpackChunkName: "MyProduct"*/ "../home/MyProduct")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")
    const MyInfos = () => import(/* webpackChunkName: "MySelects"*/ "../home/MyInfos")

    export default {
        name: 'selection',
        components: {TransitionExpand, Search, MyBasket, MySelects, MyProduct, MyInfos},
        computed: {
            ...mapState({user: s => s.user, nav: s => s.nav}),
            tabModel: {
                get() {
                    return this.nav.searchTab
                },
                set(v) {
                    this.nav.searchTab = v
                }
            }
        },
        methods: {
            select(item) {
                this.$emit('select', item)
            }
        }
    }
</script>