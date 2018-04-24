<template>
    <v-dialog width="800px" v-model="visible" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable @keydown.esc="$emit('esc')" @keydown.ctrl.enter="$emit('enter')">
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-icon>{{icon}}</v-icon>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="visible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <slot :data="data" ref="content"/>
        </v-card>
    </v-dialog>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from "vuex";

    export default {
        props: ['dialog', 'title', 'icon'],
        methods: {
            close: function () {
                this.visible = false;
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
                    return this.$store.state.dialogs[this.dialog].data;
                },
                set: function (value) {
                    this.commitData({dialog: this.dialog, data: value});
                }
            },
            visible: {
                get: function () {
                    return this.$store.state.dialogs[this.dialog].visible;
                },
                set: function (value) {
                    if (value) {
                        this.commitEmptyData(this.dialog);
                    }
                    this.commitVisible({dialog: this.dialog, visible: value});
                }
            }
        },
        watch: {
            visible(value, oldValue) {
                if (value) {
                    this.$emit('show');
                    this.$nextTick(() => this.$emit('focus'));
                }
            }
        }

    }
</script>