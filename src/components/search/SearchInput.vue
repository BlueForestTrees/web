<template>
    <p><input v-model="term"></p>
</template>

<script>
    import {mapActions} from 'vuex';
    import {UPDATE_TERM} from "mutations";

    export default {
        name: "search-input",
        methods: {
            ...mapActions({
                'termChanged': UPDATE_TERM
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