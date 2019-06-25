<template>
    <panel title="Nom" @close="$emit('close')">
        <div slot="left" class="pencil logo ml-3 mt-3  mr-1"></div>
        <search-text v-if="edit" :value="value" @input="emitInput" label="Entrez un nom"/>
        <a v-else @click="back()">{{value}}</a>
    </panel>
</template>

<script>
    import Panel from "./Panel"
    import SearchText from "./SearchText"

    export default {
        name: "TermPanel",
        components: {SearchText, Panel},
        props: ['value'],
        data: () => ({edit: true}),
        methods: {
            back() {
                this.edit = true
            },
            emitInput(v) {
                this.edit = false
                this.$emit("input", v)
            }
        }
    }
</script>