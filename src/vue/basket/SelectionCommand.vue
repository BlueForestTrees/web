<template>
    <v-tabs v-model="tabModel" centered slider-color="primary" >
        <v-tab href="#search">Recherche</v-tab>
        <v-tab href="#mines">Vos produits</v-tab>
        <v-tab href="#favoris">Favoris</v-tab>
        <v-tab href="#infos">Informations</v-tab>
    </v-tabs>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: 'selection-command',
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
        }
    }
</script>