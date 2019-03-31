<template>
    <v-container style="min-width: 17em">
        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading">Propriétaire:</h5>
            <a v-if="owner" :href="owner.site" target="_blank" class="not-too-third">{{owner.fullname}}</a>
        </v-layout>

        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading flex">Source:</h5>
            <a v-if="isOff" :href="`https://world.openfoodfacts.org/product/${code}`">voir site</a>
            <h5 class="font-weight-thin subheading" v-else>{{origin}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading">Code:</h5>
            <h5 class="font-weight-thin subheading">{{code}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="store">
            <h5 class="font-weight-thin subheading">Magasins:</h5>
            <h5 class="font-weight-thin subheading">{{store}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="date">
            <h5 class="font-weight-thin subheading">Crée:</h5>
            <h5 class="font-weight-thin subheading">{{deltaTime(date)}}</h5>
        </v-layout>
    </v-container>
</template>
<script>
    import TreeCardFront from "./QtUnitName"
    import {deltaTime} from "../../services/calculations"

    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")

    export default {
        components: {TreeCardFront, Photo},
        props: ['tree'],
        methods:{
            deltaTime
        },
        computed: {
            isOff() {
                return this.origin === "off"
            },
            origin() {
                return this.trunk && this.trunk.origin
            },
            trunk() {
                return this.tree && this.tree.trunk
            },
            code() {
                return this.trunk && this.trunk.externId
            },
            owner() {
                return this.tree && this.tree.owner
            },
            store() {
                return this.trunk && this.trunk.stores
            },
            date() {
                return this.trunk && this.trunk.date
            }
        }
    }
</script>