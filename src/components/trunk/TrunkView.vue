<template>
    <div>
        {{trunk}}
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';

    export default {
        name : 'trunk-view',
        components : {

        },
        computed : {
            ...mapState({trunk : state => state.selectedTrunk})
        }
    }
</script>