<template>
    <v-layout column>
        <v-btn v-for="(tab,i) in tabs" :key="i" icon :input-value="i === value" @click="$emit('input',i)">
            <icon :iconClass="tab.class"/>
        </v-btn>
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
                    {class: "facet logo-petit"},
                    {class: "planet logo-petit"},
                    {class: "tree logo-petit"}
                ]
            }
        }
    }
</script>