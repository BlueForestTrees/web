<template>
    <v-dialog v-model="visible" fullscreen transition="dialog-bottom-transition" scrollable
              :overlay="false"
              @keydown.esc="$emit('esc',data)" @keydown.ctrl.enter="$emit('enter',data)"
    >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-icon>{{icon}}</v-icon>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="visible = false" dark>
                    <v-icon large>clear</v-icon>
                </v-btn>
            </v-toolbar>
            <slot :data="data" ref="content"/>
            <v-spacer/>
            <v-card-actions v-if="!noaction">
                <v-btn block @click="$emit('enter', data)" large color="green">
                    <v-icon x-large color="white">check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Do from "../../const/do"
    import {mapMutations} from "vuex"
    import Vue from 'vue'

    export default {
        props: {dialog: String, title: String, icon: String, noaction: Boolean},
        methods: {
            close: function () {
                this.visible = false
            },
            ...mapMutations({
                commitData: Do.UPDATE_DIALOG_DATA,
                commitVisible: Do.UPDATE_DIALOG_VISIBILITY,
                commitEmptyData: Do.CLEAR_DIALOG_DATA
            })
        },
        computed: {
            data: {
                get: function () {
                    return this.$store.state.dialogs[this.dialog].data
                },
                set: function (value) {
                    this.commitData({dialog: this.dialog, data: value})
                }
            },
            visible: {
                get: function () {
                    return this.$store.state.dialogs[this.dialog].visible
                },
                set: function (value) {
                    if (value) {
                        this.commitEmptyData(this.dialog)
                    }
                    this.commitVisible({dialog: this.dialog, visible: value})
                }
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    this.$nextTick(() => this.$emit('focus'))
                }
            }
        }

    }
</script>