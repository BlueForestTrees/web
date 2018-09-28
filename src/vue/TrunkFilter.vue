<template>
    <div v-if="search">
        <v-divider/>
        <v-layout v-if="search.cats.length>0" row align-center>
            <v-breadcrumbs class="px-3">
                <v-icon slot="divider">arrow_forward_ios</v-icon>
                <v-breadcrumbs-item v-for="item in search.cats" @click="search.cats.splice()" :key="item._id">{{ item.name }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-icon @click="search.cats = []">clear</v-icon>
        </v-layout>
        <v-layout v-if="search.name" row align-center>
            <span class="pa-3">Nom: {{search.name}}</span><v-icon @click="search.name = null">clear</v-icon>
        </v-layout>
        <v-divider/>
    </div>
</template>

<script>
    export default {
        name: "trunk-filter",
        props: ['search']
    }
</script>