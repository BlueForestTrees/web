<template>
    <v-tabs centered :value="fragmentIdx" icons-and-text height="100">
        <v-tab @click="$emit('input', IMPACTS)" :style="{opacity: fragmentIdx === 0 ? 1 : 0.5}">
            ENVIRONNEMENT
            <v-list-tile-avatar class="planet logo-big mb-2"/>
        </v-tab>
        <v-tab @click="$emit('input', ROOTS)" :style="{opacity: fragmentIdx === 1 ? 1 : 0.5}">
            Fabrication
            <v-list-tile-avatar class="scope-tree logo-big mb-2"/>
        </v-tab>
        <v-tab @click="$emit('input', FACETS)" :style="{opacity: fragmentIdx === 2 ? 1 : 0.5}">
            PROPRIETES
            <v-list-tile-avatar class="facet logo-big mb-2"/>
        </v-tab>
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