<template>
    <div>
        <input :value="search.term" @input="onTermChange($event.target.value)">
        <div v-if="search.searching">Recherche..</div>
        <trunk-list :trunks="search.results" @select="$emit('select',$event)"></trunk-list>
        <span v-if="allowCreate"> Pas de Résultats. <button @click="$emit('create',search.term)">Créer "{{search.term}}" . . .</button></span>
    </div>
</template>

<script>
    import TrunkList from '../common/TrunkList';
    import {createNamespacedHelpers} from 'vuex'
    import * as On from "../../store/actionKeys";

    const {mapGetters, mapActions} = createNamespacedHelpers('search');

    export default {
        name: 'search-box',
        props: ['search'],
        components: {
            TrunkList
        },
        computed: {
            ...mapGetters(['allowCreate'])
        },
        methods: {
            ...mapActions([On.TERM_CHANGE])
        }
    }
</script>