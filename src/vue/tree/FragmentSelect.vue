<template>
    <v-tabs centered :value="value" @change="i=>$emit('input',i)" icons-and-text height="100">
        <v-tab v-for="(tab,i) in tabs" :key="i" @click="$emit('input', i)" :style="{opacity: value === i ? 1 : 0.7}">
            {{tab.text}}
            <v-list-tile-avatar :class="tab.class"/>
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        name: "fragment-select",
        props: ['value'],
        computed: {
            tabs() {
                return [
                    {text: "ENVIRONNEMENT", class: "planet logo-big mb2"},
                    {text: "Fabrication", class: "scope-tree logo-big mb2"},
                    {text: "Propriétés", class: "facet logo-big mb2"},
                ]
            }
        }
    }
</script>