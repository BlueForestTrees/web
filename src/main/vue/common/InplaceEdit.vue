<template>
    <span v-if="!editing" @click="edit">{{initial || '?'}}</span>
    <v-layout v-else row>
        <v-text-field autofocus
                      :value="initial"
                      @input="current = $event" @keydown.esc.stop.native="ko" @keydown.enter.stop.native="ok"
                      @blur="ko"
        />
                      <!--@blur="ko"-->
        <v-icon right color="green" @click="ok">done</v-icon>
        <v-icon right color="red" @click="ko">clear</v-icon>
    </v-layout>
</template>


<script>
    export default {
        name: 'inplace-edit',
        props: ['initial'],
        data: function () {
            return {
                editing: false,
                current: this.initial
            }
        },
        methods: {
            edit:function(){
                this.editing = true;
            },
            ok: function () {
                this.editing = false;
                this.$emit("ok", this.current);
            },
            ko: function () {
                this.editing = false;
                this.current = this.initial;
                this.$emit("ko");
            }
        }
    }
</script>


<style>

</style>