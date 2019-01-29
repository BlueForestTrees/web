<template>
    <v-tabs centered :value="fragmentIdx" icons-and-text>
        <v-tab class="logo-big planet" @click="$emit('input', IMPACTS)"/>
        <v-tab class="logo-big ressource" @click="$emit('input', ROOTS)"/>
        <v-tab class="logo-big facet" @click="$emit('input', FACETS)"/>
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