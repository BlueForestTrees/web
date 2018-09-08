<template>
    <v-container>
        <v-list-tile v-if="owner">
            <v-flex>Propriétaire:</v-flex>
            <v-flex>{{owner.shortname}}</v-flex>
            <v-flex>{{owner.fullname}}</v-flex>
        </v-list-tile>
    </v-container>
</template>
<script>
    export default {
        props: ['tree'],
        computed: {
            owner() {
                return this.tree && this.tree.owner
            }
        }
    }
</script>