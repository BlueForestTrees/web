<template>
    <div id="app">

        <div id="trunk" v-if="trunk">
            <button @click="onTrunkClose">X</button>
            <trunk-path :path="path" v-on:select="onPathClick"></trunk-path>
            <trunk-list :trunks="seed.roots" v-on:select="onRootClick"></trunk-list>

            <p><input :value="search.term" @input="onTermChange($event.target.value)"></p>
            <div v-if="search.searching">Recherche..</div>
            <trunk-list :trunks="search.results" v-on:select="onCreateSeedClick"></trunk-list>
            <span v-if="allowCreate"> Pas de Résultats. <button @click="onCreateTrunkThenSeedClick">Créer "{{search.term}}" . . .</button></span>

        </div>

        <div id="search" v-if="!trunk">

            <p><input :value="search.term" @input="onTermChange($event.target.value)"></p>
            <div v-if="search.searching">Recherche..</div>
            <trunk-list :trunks="search.results" v-on:select="onOpenTreeClick"></trunk-list>
            <span v-if="allowCreate"> Pas de Résultats. <button @click="onCreateAndOpenTreeClick">Créer "{{search.term}}" . . .</button></span>

        </div>

    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import * as On from "../store/actionKeys";
    import TrunkList from './search/TrunkList';
    import TrunkPath from './search/TrunkPath';

    export default {
        name: 'app',
        components: {
            TrunkList, TrunkPath
        },
        computed: {
            ...mapGetters(['trunk', 'seed', 'allowCreate']),
            ...mapState(
                ['path', 'search']
            )
        },
        methods: {
            ...mapActions([On.TERM_CHANGE, On.TRUNK_CLOSE, On.PATH_CLICK, On.ROOT_CLICK, On.CREATE_SEED_CLICK, On.CREATE_TRUNK_THEN_SEED_CLICK, On.CREATE_AND_OPEN_TREE_CLICK, On.OPEN_TREE_CLICK])
        }
    }
</script>

<style>
    #app, input {
        font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 1.5em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
