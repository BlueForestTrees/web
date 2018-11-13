<template>
    <div v-if="search">
        <v-layout v-if="search.cats.length>0" row align-center>
            <span class="pa-3">Catégorie:</span>
                <template v-for="(cat, idx) in search.cats">
                    <span>{{cat.name}}</span>
                    <v-icon small v-if="idx < search.cats.length-1">keyboard_arrow_right</v-icon>
                </template>
            <v-icon @click="search.cats = []">clear</v-icon>
        </v-layout>
        <span v-if="search.name">
        <v-divider/>
        <v-layout row align-center>
            <span class="pa-3">Nom:</span>
            <span>{{ search.name }}</span>
            <v-icon @click="search.name = null">clear</v-icon>
        </v-layout>
        </span>
        <v-divider/>
    </div>
</template>

<script>
    export default {
        name: "trunk-filter",
        props: ['search']
    }
</script>