<template>
    <div id="app">

        <div id="trunk" v-if="trunk">
            <button @click="closeTrunk">X</button>
            <trunk-path :path="path" v-on:select="splicePath"></trunk-path>
            <trunk-list :trunks="seed.cache" v-on:select="linkRoot"></trunk-list>

            <p><input :value="search.term" @input="updateTerm($event.target.value)"></p>
            <div v-if="search.searching">Recherche..</div>
            <trunk-list :trunks="search.results" v-on:select="addRoot"></trunk-list>
            <span v-if="allowCreate"> Pas de Résultats. <button @click="createRoot">Créer "{{search.term}}" . . .</button></span>

        </div>

        <div id="search" v-if="!trunk">

            <p><input :value="search.term" @input="updateTerm($event.target.value)"></p>
            <div v-if="search.searching">Recherche..</div>
            <trunk-list :trunks="search.results" v-on:select="loadTrunk"></trunk-list>
            <span v-if="allowCreate"> Pas de Résultats. <button @click="createTrunk">Créer "{{search.term}}" . . .</button></span>

        </div>

    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
    import {
        CLOSE_TRUNK,
        CREATE_ROOT,
        CREATE_TRUNK,
        LOAD_TRUNK,
        SPLICE_PATH,
        ADD_ROOT,
        UPDATE_TERM, LINK_ROOT, CLEAR_SEARCH
    } from "../store/keys";
    import TrunkList from './search/TrunkList';
    import TrunkPath from './search/TrunkPath';

    export default {
        name: 'app',
        components: {
            TrunkList, TrunkPath
        },
        computed: {
            ...mapGetters(['trunk','seed','allowCreate']),
            ...mapState(
                ['path', 'search']
            )
        },
        methods: {
            ...mapActions([LINK_ROOT, UPDATE_TERM, LOAD_TRUNK]),
            ...mapMutations([SPLICE_PATH, ADD_ROOT, CLOSE_TRUNK]),
            createTrunk(){
                this.$store.dispatch(CREATE_TRUNK,this.search.term);
            },
            createRoot(){
                this.$store.dispatch(CREATE_ROOT,this.search.term);
                this.$store.commit(CLEAR_SEARCH);
            }
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
