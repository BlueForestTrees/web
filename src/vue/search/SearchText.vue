<template>
    <v-text-field
            :value="value" @input="update" class="mb-1"
            :solo="!notSolo" hide-details autofocus append-icon="search"
            @click:append="emitInput" @enter="emitInput" v-on:keyup.enter="emitInput"
    ></v-text-field>
</template>

<script>

    export default {
        name: "search-text",
        props: ['value','not-solo'],
        data: () => ({v: null}),
        methods: {
            update(v) {
                this.v = v
                if (!v) this.emitInput()
            },
            emitInput() {
                this.$emit("input", this.v)
            }
        },
        watch: {
            value(v) {
                this._value = v
            }
        }
    }
</script>