<template>
    <v-container>
        <v-textarea v-model="description"
                    autofocus outline append-icon="save" placeholder="Entrez une description pour votre équivalence" :counter="maxLength"
                    :error-messages="errors"
                    @input="check" @click:append="validate" @enter="validate" v-on:keyup.ctrl.enter="validate"/>
        {{errors}}
    </v-container>
</template>

<script>

    export default {
        name: "description-input",
        props: ['value'],
        data: () => ({
            description: null,
            errors: null,
            maxLength: 100
        }),
        methods: {
            check() {
                this.errors = this.description && (this.description.length > this.maxLength) ? ["Trop long"] : null
            },
            validate() {
                this.check()
                if (!this.errors)
                    this.$emit("save", this.description)
            },
        },
        mounted() {
            this.description = this.value
        }
    }
</script>