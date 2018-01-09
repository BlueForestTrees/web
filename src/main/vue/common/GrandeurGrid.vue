<template>
    <v-card>
        <v-subheader>Grandeur: {{grandeur}}</v-subheader>
        <v-container fluid grid-list-sm>
            <v-layout row wrap>
                <v-chip v-for="grandeur in items" :key="grandeur"
                        fab dark small @click="select(grandeur)" color="primary" text-color="white">{{grandeur}}
                </v-chip>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>

    export default {
        props: ['items'],
        data() {
            return {
                grandeur: null
            };
        },
        methods: {
            select(grandeur) {
                this.grandeur = grandeur;
                this.$emit('select', grandeur);
            }
        }
    }
</script>