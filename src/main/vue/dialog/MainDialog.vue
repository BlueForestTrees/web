<template>
    <v-dialog width="800px" v-model="visible" @keydown.esc="$emit('esc')" @keydown.ctrl.enter="$emit('enter')">
            <slot :data="data" ref="content"/>
    </v-dialog>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from "vuex";

    export default {
        props: ['dialog'],
        methods: {
            close: function (){
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
            visible(visible) {
                if (visible) {
                    this.$nextTick(()=>this.$emit('focus'));
                }
            }
        }

    }
</script>