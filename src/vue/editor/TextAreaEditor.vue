<template>
    <v-container>
        <v-textarea v-model="text"
                    autofocus outline :placeholder="placeholder" :label="label" :counter="maxLength"
                    :error-messages="errors"
                    @input="check" @enter="validate" v-on:keyup.ctrl.enter="validate"/>

        <v-layout justify-end>
            <v-btn @click="validate">ok</v-btn>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "textarea-editor",
        props: {
            value: String,
            maxLength: {type: Number, default: 100},
            placeholder: String,
            label: String
        },
        data: () => ({
            text: null,
            errors: null
        }),
        methods: {
            check() {
                this.errors = this.text && (this.text.length > this.maxLength) ? ["Trop long"] : null
            },
            validate() {
                this.check()
                if (!this.errors)
                    this.$emit("save", this.text)
            },
        },
        created() {
            this.text = this.value
        }
    }
</script>