<template>
    <v-card>
        <v-layout column>
            <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center>
                <description :tree="tree" class="ma-5"/>
                <tree-card :tree="tree"/>
            </v-layout>
            <fragment-select :value="value" @input="emitInput"/>
        </v-layout>
    </v-card>
</template>
<script>
    import Description from "./Description"
    import TreeCard from "./TreeCard"
    import FragmentSelect from "./FragmentSelect"

    export default {
        name: "tree-headpage",
        components: {FragmentSelect, TreeCard, Description},
        props: ['tree', 'value'],
        methods: {
            emitInput(idx) {
                this.$emit('input', idx)
            }
        }
    }
</script>