<template>
    <v-btn v-if="noText" flat icon @click="showMessages">
        <v-icon color="primary">chat</v-icon>
    </v-btn>
    <div v-else @click="showMessages">
        <slot>
            <v-layout row class="hand" align-center>
                <v-btn v-if="!noicon" flat icon>
                    <v-icon color="primary">chat</v-icon>
                </v-btn>
                <h3 class="font-weight-thin">{{section.title}}</h3>
            </v-layout>
        </slot>
    </div>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {secs} from "../../const/sections"

    export default {
        name: "open-message",
        props: {section: {type: Object}, noText: {type: Boolean, default: false}, noicon: {type: Boolean, default: false}},
        methods: {
            showMessages() {
                this.dispatchShowMessages(this.section)
            },
            ...mapActions({
                dispatchShowMessages: On.SHOW_MESSAGES
            })
        }
    }
</script>