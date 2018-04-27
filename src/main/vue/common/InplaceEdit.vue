<template>
    <span v-if="!editing" @click="edit">{{initial || 'qt?'}}</span>
    <v-layout v-else row>
        <v-form v-model="valid" v-on:submit.prevent="">
            <v-text-field autofocus
                          :value="current" @input="current = $event"
                          @keydown.esc.stop.native="ko" @keydown.enter.stop.native="ok" @blur="ko"
                          :rules="[required, isNumber]"
            />
        </v-form>
        <!--@blur="ko"-->
        <v-icon right color="green" @click="ok">done</v-icon>
        <v-icon right color="red" @click="ko">clear</v-icon>
    </v-layout>
</template>

<script>
    import {isNumber, required} from "../../services/rules";

    export default {
        name: 'inplace-edit',
        props: ['initial'],
        data: function () {
            return {
                editing: false,
                current: this.initial,
                valid: false
            }
        },

        methods: {
            edit: function () {
                this.editing = true;
            },
            ok: function () {
            if (this.valid) {
                this.editing = false;
                this.$emit("ok", this.current);
                }

            },
            ko: function () {
                this.editing = false;
                this.current = this.initial;
                this.$emit("ko");
            },

            required, isNumber

        },

    }
</script>