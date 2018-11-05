<template>
    <v-flex key="basket">
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Panier</span>
        </v-layout>

        <basket-comp/>

    </v-flex>
</template>

<script>
    import BasketComp from "./BasketComp"

    export default {
        name: 'basket',
        components: {BasketComp}
    }
</script>

<style>
    ::after {
        content: none
    }
</style>