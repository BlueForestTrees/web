<template>
    <v-container style="min-width: 17em">
        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading">Propriétaire:</h5>
            <a v-if="owner" :href="owner.site" target="_blank" class="not-too-third">{{owner.fullname}}</a>
        </v-layout>

        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading flex">Source:</h5>
            <a v-if="isOff" :href="`https://world.openfoodfacts.org/product/${externId}`">voir site</a>
            <h5 class="font-weight-thin subheading" v-else>{{origin}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading">ID:</h5>
            <h5 class="font-weight-thin subheading">{{externId}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="store">
            <h5 class="font-weight-thin subheading">Magasins:</h5>
            <h5 class="font-weight-thin subheading">{{store}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="date">
            <h5 class="font-weight-thin subheading">Valable depuis:</h5>
            <h5 class="font-weight-thin subheading">{{date}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="dateUntil">
            <h5 class="font-weight-thin subheading">Valable jusqu'au:</h5>
            <h5 class="font-weight-thin subheading">{{dateUntil}}</h5>
        </v-layout>

        <template v-if="comment">
            <h5 class="font-weight-thin subheading">Commentaires:</h5>
            <div class="font-weight-thin ml-1" v-html="comment"></div>
        </template>
    </v-container>
</template>
<script>
    import TreeCardFront from "./QtUnitName"
    import {deltaTime, monthYear} from "../../services/calculations"

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
            externId() {
                return this.trunk && this.trunk.externId
            },
            owner() {
                return this.tree && this.tree.owner
            },
            store() {
                return this.trunk && this.trunk.stores
            },
            date() {
                return this.trunk && this.trunk.date && monthYear(this.trunk.date)
            },
            dateUntil() {
                return this.trunk && this.trunk.dateUntil && monthYear(this.trunk.dateUntil)
            },
            comment() {
                return this.trunk && this.trunk.comment
            }
        }
    }
</script>