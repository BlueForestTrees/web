<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-layout row wrap>
            <v-chip v-for="root in tree.roots" :key="root._id"
                    fab dark small @click="select(0,root)" color="primary" text-color="white">
                {{root.name}}
            </v-chip>
        </v-layout>

    </v-card>


</template>

<script>
    export default {
        props:['tree'],
        data(){
            return {
                path: [this.tree]
            }
        },
        methods:{
            select(trunk,root){
                console.log(this.path);
                console.log(trunk, root);
            }
        }
    }
</script>