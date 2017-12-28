<template>
    <span>
        <div>
            <input :value="search.term" @input="onTermChange($event.target.value)"/>
        </div>
        <div v-if="searchOccur">
            <span v-if="hasResults">Ouvrir: </span>
            <list :trunks="search.results" @select="$emit('select',$event)"></list>
        </div>
        <div v-if="allowCreate">
            <span @click="$emit('create',search.term)">Créer "{{search.term}}"...</span>
        </div>
    </span>
</template>

<script>
    import List from '../common/List';
    import {createNamespacedHelpers} from 'vuex'
    import {On} from "../../store/keys";

    const {mapGetters, mapActions} = createNamespacedHelpers('search');

    export default {
        name: 'search-box',
        props: ['search'],
        components: {
            List
        },
        computed: {
            ...mapGetters(['allowCreate', 'searchOccur', 'hasResults'])
        },
        methods: {
            ...mapActions([On.UPDATE_SEARCH_TERM])
        }
    }
</script>