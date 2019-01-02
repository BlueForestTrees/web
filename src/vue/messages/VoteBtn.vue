<template>
    <v-btn v-if="!voting && !voted" color="primary" @click="vote">{{text}}</v-btn>
    <loader v-else-if="!voted"></loader>
    <v-btn v-else disabled>{{textVoted}}</v-btn>
</template>
<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"

    export default {
        name: "vote-btn",
        components: {Loader},
        props: ['text', 'textVoted', 'feature'],
        data: () => ({voting: false, voted: false}),
        methods: {
            ...mapActions({voteFor: On.VOTE_FOR}),
            async vote() {
                this.voting = true
                this.voted = await this.voteFor({feature: this.feature, message: null})
                this.voting = false
                this.$emit("vote")
            }
        }
    }
</script>