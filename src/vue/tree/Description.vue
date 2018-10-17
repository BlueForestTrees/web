<template>
    <v-layout column align-center>
        <v-flex>
            <photo :trunk="trunk"/>
        </v-flex>
        <v-layout row align-center v-if="owner">
            <v-flex>Propriétaire:</v-flex>
            <v-spacer/>
            <v-flex><a :href="owner.site" target="_blank">{{owner.fullname}}</a></v-flex>
        </v-layout>
        <v-layout row align-center v-if="code">
            <v-flex>Code:</v-flex>
            <v-spacer/>
            <span>{{code}}</span>
        </v-layout>
    </v-layout>
</template>
<script>
    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")

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