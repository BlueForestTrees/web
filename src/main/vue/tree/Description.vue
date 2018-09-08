<template>
    <v-container>
        <v-list-tile>
            <v-flex>Propriétaire:</v-flex>
            <v-flex>{{proprietaire}}</v-flex>
        </v-list-tile>
    </v-container>
</template>
<script>
    export default {
        props: ['tree'],
        data() {
            return {
                proprietaire: null
            }
        }
    }
</script>