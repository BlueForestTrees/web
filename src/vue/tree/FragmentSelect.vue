<template>
    <v-tabs centered :value="fragmentIdx" icons-and-text>
        <v-tab class="logo-big planet" @click="$emit('input', IMPACTS)" :style="{opacity: fragmentIdx === 0 ? 1 : 0.5}"/>
        <v-tab class="logo-big scope-tree" @click="$emit('input', ROOTS)" :style="{opacity: fragmentIdx === 1 ? 1 : 0.5}"/>
        <v-tab class="logo-big facet" @click="$emit('input', FACETS)" :style="{opacity: fragmentIdx === 2 ? 1 : 0.5}"/>
    </v-tabs>
</template>

<script>
    import {FACETS, IMPACTS, ROOTS} from "../../const/fragments"

    export default {
        name: "fragment-select",
        props: ['value'],
        data: () => ({IMPACTS, ROOTS, FACETS}),
        computed: {
            fragmentIdx() {
                return [IMPACTS, ROOTS, FACETS].indexOf(this.value)
            }
        }
    }
</script>