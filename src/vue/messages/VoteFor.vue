<template>
    <v-flex>
        <v-layout row align-center>
            <v-icon color="orange" large>new_releases</v-icon>
            Voter pour une fonctionnalité
        </v-layout>
        <v-flex class="px-5 pt-3">{{text}}</v-flex>
        <v-text-field v-if="!voting && !voted" v-model="message" placeholder="message (optionnel)" @keydown.enter.stop.native="vote" class="px-3"></v-text-field>
        <v-flex v-else-if="!voted" pt-3>
            <loader/>
        </v-flex>
        <v-layout v-else row align-center>
            <v-flex pt-3 class="display-1 align font-weight-thin">Merci</v-flex>
        </v-layout>
        <v-layout row>
            <v-spacer/>
            <v-btn color="primary" :disabled="voting || voted" @click="vote">OUI</v-btn>
        </v-layout>
    </v-flex>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"

    export default {
        name: "vote-for",
        components: {Loader},
        props: ['text', 'feature'],
        data: () => ({message: null, voting: false, voted: false}),
        methods: {
            ...mapActions({voteFor: On.VOTE_FOR}),
            async vote() {
                this.voting = true
                await this.voteFor({feature: this.feature, message: this.message})
                this.message = null
                this.voting = false
                this.voted = true
                this.$emit("vote")
            }
        }
    }
</script>