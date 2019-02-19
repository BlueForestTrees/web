<template>
    <v-menu offset-y>
        <v-btn class="elevation-3" fab bottom right color="grey" dark fixed slot="activator">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list>
            <v-list-tile @click="go">
                <v-list-tile-avatar>
                    <v-icon>keyboard_tab</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{title}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import {Dial} from "../../const/dial"
    import {mapActions} from 'vuex'
    import On from "../../const/on"
    import {GO} from "../../const/go"

    export default {
        name: "add-entry-fab",
        props: {route: String, title: String, callback: String},
        data: () => ({
            Dial, GO
        }),
        methods: {
            ...mapActions({
                addCallback: On.ADD_CALLBACK,
                goto: On.GO_TO
            }),
            go() {
                this.callback && this.addCallback(this.callback)
                this.goto(this.route)
            }
        }
    }
</script>