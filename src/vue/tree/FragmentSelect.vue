<template>
    <v-item-group :value="value" @change="idx => $emit('change',idx)">
        <v-layout py-2>
            <v-item v-for="(tab,i) in tabs" :key="i">
                <v-flex xs12 md4 slot-scope="{ active, toggle }">
                    <v-layout column align-center @click="toggle" :style="{opacity: active ? 1 : 0.5}">
                        <v-list-tile-avatar :class="tab.class"/>
                        <span class="font-weight-thin">{{tab.text}}</span>
                    </v-layout>
                </v-flex>
            </v-item>
        </v-layout>
    </v-item-group>
</template>

<script>
    export default {
        name: "fragment-select",
        props: ['value'],
        computed: {
            tabs() {
                return [
                    {text: "Environnement", class: "planet logo-big mb2"},
                    {text: "Fabrication", class: "scope-tree logo-big mb2"},
                    {text: "Propriétés", class: "facet logo-big mb2"},
                ]
            }
        }
    }
</script>