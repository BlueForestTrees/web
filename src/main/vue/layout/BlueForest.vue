<template>

</template>

<script>
    import Tree from "../tree/Tree";

    import {mapState} from 'vuex';
    import Lookup from "../common/Lookup";
    import Compare from "./Compare";

    export default {
        components: {
            Compare,
            Lookup, Tree
        },
        computed: {
            ...mapState(['tree', 'compareTo'])
        },
        methods: {}
    }

</script>