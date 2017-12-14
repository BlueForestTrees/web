<template>
    <div id="app">

        <div id="trunk" v-if="trunk">
            <button @click="closeTrunk">X</button>
            <trunk-list :trunks="path"></trunk-list>
            <trunk-list :trunks="seed.roots"></trunk-list>
        </div>

        <div id="search">
            <p><input :value="search.term" @input="updateTerm($event.target.value)"></p>
            <button v-if='search.term' @click='createTrunk'>{{`Créer "${search.term}"`}}</button>
            <div v-if="search.searching">Recherche..</div>
            <trunk-list :trunks="search.results" v-on:select="loadTrunk"></trunk-list>
        </div>

    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import {CLOSE_TRUNK, CREATE_TRUNK, LOAD_TRUNK, UPDATE_TERM} from "../store/keys";
    import TrunkList from './search/TrunkList';

    export default {
        name: 'app',
        components: {
            TrunkList
        },
        computed: {
            ...mapGetters(['trunk']),
            ...mapState(
                ['path', 'seed', 'search']
            )
        },
        methods: {
            ...mapActions([CLOSE_TRUNK, UPDATE_TERM, LOAD_TRUNK]),
            createTrunk(){
                this.$store.dispatch(CREATE_TRUNK,this.search.term);
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
