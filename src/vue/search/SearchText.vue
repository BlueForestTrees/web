<template>
    <v-text-field
            flat
            :value="value" @input="update" class="mb-1" :placeholder="label"
            :solo="!notSolo" hide-details autofocus
            @click:append="emitInput" @enter="emitInput" v-on:keyup.enter="emitInput"
    ></v-text-field>
</template>

<script>

    export default {
        name: "search-text",
        props: ['value', 'not-solo', 'label'],
        data: function () {
            return {v: this.value}
        },
        methods: {
            update(v) {
                this.v = v
                if (!v) this.emitInput()
            },
            emitInput() {
                this.$emit("input", this.v)
            }
        }
    }
</script>