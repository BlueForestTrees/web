<template>
    <v-layout column>
        <template v-for="(tab,i) in tabs">
            <v-btn icon :input-value="i === value" @click="$emit('input',i)"><icon :iconClass="tab.class" /></v-btn>
        </template>
    </v-layout>
</template>

<script>
    import Icon from "../common/icon"
    export default {
        name: "tree-menu",
        components: {Icon},
        props: {tree: Object, value: {type: Number, default: 0}},
        computed: {
            tabs() {
                return [
                    {class: "description logo-petit ma-2"},
                    {class: "planet logo-petit ma-2"},
                    {class: "facet logo-petit ma-2"},
                    {class: "scope-tree logo-petit ma-2"},
                ]
            }
        }
    }
</script>

<style scoped>

</style>