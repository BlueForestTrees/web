<template>
    <p><input v-model="term"></p>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {ON_SEARCH_TERM_CHANGE} from "../../store/mutations";

    const {mapActions} = createNamespacedHelpers('search');

    export default {
        name: "search-input",
        methods: {
            ...mapActions({
                'termChanged': ON_SEARCH_TERM_CHANGE
            })
        },
        computed: {
            term: {
                get() {
                    return this.$store.state.search.term
                },
                set(value) {
                    this.termChanged(value);
                }
            }
        }

    }

</script>