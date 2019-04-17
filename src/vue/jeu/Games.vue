<template>
    <v-container>

        <!--<v-layout row wrap justify-center align-center xs-4 mb-1>-->
            <!--<v-list-tile-avatar class="game logo my-3"></v-list-tile-avatar>-->
            <!--<search-text :value="search.name" @input="pickName" class="not-too-half"/>-->
        <!--</v-layout>-->

        <!--<v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center>-->

            <!--<owner-picker @input="pickOwner" :value="search.owner"/>-->
        <!--</v-layout>-->

        <v-card>
            <search-list :action="On.SEARCH_GAMES" :filter="filter" empty-search>
                <template slot-scope="{item}">
                    <v-list-tile :key="item._id" avatar @click="select(item)">
                        <v-list-tile-content v-if="item.type==='qui2'">
                            <v-list-tile-title>Qui a le plus de {{item.fragmentName}}?</v-list-tile-title>
                            <v-list-tile-sub-title>Avec {{ item.leftName }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{deltaTime(item.date)}}</v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider/>
                </template>
            </search-list>
        </v-card>
    </v-container>
</template>
<script>
    import On from "../../const/on"
    import SearchList from "../common/SearchList"
    import {QUI2} from "../../const/games"
    import {GO} from "../../const/go"
    import SearchText from "../search/SearchText"
    import {mapState, mapGetters} from "vuex"
    import OwnerPicker from "../search/OwnerPanel"
    import {deltaTime} from "../../services/calculations"

    export default {
        name: 'games',
        components: {OwnerPicker, SearchText, SearchList},
        data: () => ({On}),
        methods: {
            deltaTime,
            select(item) {
                if (item.type === QUI2) {
                    this.$router.push({name: GO.GAME, params: {gameId: item._id}})
                }
            },
            pickName(name) {
                this.search.name = name
            },
            pickOwner(owner) {
                this.search.owner = owner
            },
        },
        computed: {
            ...mapState({search: s => s.search}),
            ...mapGetters(['filter']),
        }
    }
</script>