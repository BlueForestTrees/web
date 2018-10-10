<template>
    <span>
        <photo :trunk="trunk"/>
        <v-list-tile v-if="owner">
            <v-flex>Propriétaire:</v-flex>
            <v-flex>{{owner.shortname}}</v-flex>
            <v-flex>{{owner.fullname}}</v-flex>
        </v-list-tile>
        <v-flex v-if="code">Code: {{code}}</v-flex>
    </span>
</template>
<script>
    import Photo from "../common/Photo"

    export default {
        components: {Photo},
        props: ['tree'],
        computed: {
            trunk() {
                return this.tree && this.tree.trunk
            },
            code() {
                return this.trunk && this.trunk.externId
            },
            owner() {
                return this.tree && this.tree.owner
            }
        }
    }
</script>