<template>
    <v-card class="ma-5">
        <subpage-title title="Vu récemment" icon="schedule"/>
        <v-card-text v-if="!basket.length" class="text-md-center"><br>Vous n'avez rien consulté récemment. <br><br>Faites une recherche pour trouver des choses intéressantes!</v-card-text>
        <div v-else>
            <selectable-list :items="basket" selection-key="recent"/>
        </div>

        <v-layout justify-center>
            <btn :enabled="oneSelected" icon-class="blueforest logo" @click="goTree(oneSelected)"></btn>
        </v-layout>

    </v-card>
</template>
<script>
    import {mapActions, mapState} from "vuex"
    import BasketComp from "../basket/BasketComp"
    import On from "../../const/on"
    import SubpageTitle from "../tree/SubpageTitle"
    import SelectableList from "../common/SelectableList"
    import Selectable from "../mixin/Selectable"
    import Btn from "../common/btn"

    export default {
        name: "recent",
        mixins: [Selectable],
        props: {selectionKey: "recent"},
        components: {Btn, SelectableList, SubpageTitle, BasketComp},
        computed: {
            ...mapState(['basket'])
        },
        methods: {
            ...mapActions({
                goSearch: On.GO_SEARCH,
                goTree: On.GO_TREE
            })
        }
    }
</script>