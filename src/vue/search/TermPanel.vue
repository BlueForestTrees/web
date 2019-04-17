<template>
    <panel title="Nom" @close="$emit('close')">
        <search-text :value="value" @input="emitInput" label="Entrez un nom"/>
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