<template>
    <v-layout column>
        <v-btn v-for="(tab,i) in tabs" :key="i" icon :input-value="i === value" @click="$emit('input',i !== value ? i : null)">
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
                    {class: "description logo-petit"},
                    {class: "planet logo-petit"},
                    {class: "facet logo-petit"},
                    {class: "branches logo-petit"},
                    {class: "trunk logo-petit"},
                    {class: "roots logo-petit"}
                ]
            }
        }
    }
</script>