<template>
    <p><input v-model="term"></p>
</template>

<script>
    import {mapActions} from 'vuex';
    import {CHANGE_TERM} from "mutations";

    export default {
        name: "search-input",
        methods: {
            ...mapActions({
                'termChanged': CHANGE_TERM
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