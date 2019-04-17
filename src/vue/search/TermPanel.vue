<template>
    <panel title="Nom" @close="$emit('close')">
        <v-icon slot="left" color="primary" class="ml-3">search</v-icon>
        <a v-if="value" @click="emitInput(null)">{{value}}</a>
        <search-text v-else :value="value" @input="emitInput" label="Entrez un nom"/>
    </panel>
</template>

<script>
    import Panel from "./Panel"
    import SearchText from "./SearchText"

    export default {
        name: "TermPanel",
        components: {SearchText, Panel},
        props: ['value'],
        methods: {
            emitInput(v) {
                this.$emit("input", v)
            }
        }
    }
</script>