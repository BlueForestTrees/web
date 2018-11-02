<template>
    <v-flex key="basket">
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Panier</span>
        </v-layout>

        <basket-comp/>

    </v-flex>
</template>

<script>
    import {mapActions} from "vuex"
    import selectable from "../mixin/Selectable"
    import BasketComp from "./BasketComp"
    import On from "../../const/on"
    import {Dial} from "../../const/dial"

    export default {
        name: 'basket',
        components: {BasketComp},
        mixins: [selectable],
        methods: {
            ...mapActions({
                goCompare: On.GO_COMPARE,
                showDialog:On.SHOW_DIALOG
            }),
            goAdd(selection) {
                this.showDialog({dialog:Dial.ADD_RESSOURCE, data: {left: selection[0], right:selection[1]}})
            }
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>