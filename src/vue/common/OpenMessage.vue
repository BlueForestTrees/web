<template>
    <div @click="showMessages">
        <slot>
            <v-layout row justify-center align-center class="hand">
                <v-btn v-if="!noicon" flat icon>
                    <v-icon color="primary">message</v-icon>
                </v-btn>
                <h3 v-if="!dense" class="font-weight-thin">{{section.title}}</h3>
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
        props: {section: {type: Object}, dense: {type: Boolean, default: false}, noicon: {type: Boolean, default: false}},
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