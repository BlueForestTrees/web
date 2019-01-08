<template>
    <v-tabs-items v-model="tabModel">
        <v-tab-item value="search" lazy>
            <search v-if="tabModel==='search'" @select="select"/>
        </v-tab-item>
        <v-tab-item value="mines" lazy>
            <my-product v-if="tabModel==='mines'" :user="user" @select="select"/>
        </v-tab-item>
        <v-tab-item value="favoris" lazy>
            <my-selects v-if="tabModel==='favoris'" :user="user" @select="select"/>
        </v-tab-item>
        <v-tab-item value="recent" lazy>
            <my-basket v-if="tabModel==='recent'" @select="select"/>
        </v-tab-item>
    </v-tabs-items>
</template>

<script>
    import {mapState} from "vuex"

    const Search = () => import(/* webpackChunkName: "MyBasket"*/ "../search/Search")
    const MyBasket = () => import(/* webpackChunkName: "MyBasket"*/ "../home/MyBasket")
    const MyProduct = () => import(/* webpackChunkName: "MyProduct"*/ "../home/MyProduct")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")

    export default {
        name: 'selection',
        components: {Search, MyBasket, MySelects, MyProduct},
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