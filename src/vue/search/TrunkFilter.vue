<template>
    <div v-if="search">
        <v-layout v-if="search.cats.length>0" row align-center>
            <span class="pa-3">Catégorie:</span>
            <v-breadcrumbs class="px-3">
                <v-icon slot="divider">arrow_forward_ios</v-icon>
                <v-breadcrumbs-item v-for="item in search.cats" :key="item._id"><span>{{ item.name }}</span></v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-icon @click="search.cats = []">clear</v-icon>
        </v-layout>
        <span v-if="search.name">
        <v-divider/>
        <v-layout row align-center>
            <span class="pa-3">Nom:</span>
            <v-breadcrumbs class="px-3">
                <v-breadcrumbs-item><span>{{ search.name }}</span></v-breadcrumbs-item>
            </v-breadcrumbs>
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