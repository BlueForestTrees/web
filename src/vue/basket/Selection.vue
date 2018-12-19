<template>
    <v-flex key="basket">
        <v-tabs v-model="tabModel" centered slider-color="primary">
            <v-tab href="#panier">Vu récemment</v-tab>
            <v-tab href="#mines">Vos produits et services</v-tab>
            <v-tab href="#favoris">Favoris</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabModel">
            <v-tab-item value="panier">
                <my-basket v-if="tabModel==='panier'"/>
            </v-tab-item>
            <v-tab-item value="mines">
                <my-product v-if="tabModel==='mines'" :user="user"/>
            </v-tab-item>
            <v-tab-item value="favoris">
                <my-selects v-if="tabModel==='favoris'" :user="user"/>
            </v-tab-item>
        </v-tabs-items>
    </v-flex>
</template>

<script>
    import {mapState} from "vuex"

    const MyBasket = () => import(/* webpackChunkName: "MyBasket"*/ "../home/MyBasket")
    const MyProduct = () => import(/* webpackChunkName: "MyProduct"*/ "../home/MyProduct")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")

    export default {
        name: 'selection',
        components: {MyBasket, MySelects, MyProduct},
        data: () => ({tabModel: null}),
        computed: {
            ...mapState(['user'])
        }
    }
</script>