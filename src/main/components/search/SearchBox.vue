<template>
    <span>
        <div>
            <input :value="search.term" @input="onTermChange($event.target.value)"/>
        </div>
        <div v-if="searchOccur">
            <span v-if="hasResults">Ouvrir: </span>
            <trunk-list :trunks="search.results" @select="$emit('select',$event)"></trunk-list>
        </div>
        <div v-if="allowCreate">
            <span @click="$emit('create',search.term)">Créer "{{search.term}}"...</span>
        </div>
    </span>
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
            ...mapGetters(['allowCreate', 'searchOccur', 'hasResults'])
        },
        methods: {
            ...mapActions([On.TERM_CHANGE])
        }
    }
</script>