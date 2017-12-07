<template>
    <div id="trunk" v-if="trunk">
        <trunk-view></trunk-view>
        <button @click="closeTrunk()">X</button>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import TrunkView from "./TrunkView.vue";
    import {CLOSE_TRUNK} from 'mutations';

    export default {
        name : 'trunk',
        components : {
            TrunkView
        },
        computed : {
            ...mapState({trunk : state => state.selectedTrunk})
        },
        methods : {
            ...mapActions([CLOSE_TRUNK])
        }
    }
</script>