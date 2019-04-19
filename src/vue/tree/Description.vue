<template>
    <v-container style="min-width: 17em" pt-3>

        <v-layout align-center justify-center>
            <photo :trunk="tree.trunk" size="200" class="mb-2"/>
        </v-layout>

        <v-layout align-center justify-space-between>
            <h5 class="font-weight-thin subheading">Propriétaire:</h5>
            <a v-if="owner" :href="owner.site" target="_blank" class="not-too-third">{{owner.fullname}}</a>
        </v-layout>

        <v-layout v-if="isOff" align-center justify-space-between>
            <h5 class="font-weight-thin subheading flex">Source:</h5>
            <v-layout row align-center><a :href="`https://world.openfoodfacts.org/product/${externId}`" target="_blank">lien<v-icon>link</v-icon></a></v-layout>
        </v-layout>
        <v-layout v-else-if="source" align-center justify-space-between>
            <h5 class="font-weight-thin subheading flex">Source:</h5>
            <a :href="source" target="_blank"><v-layout row align-center><v-icon>link</v-icon>lien</v-layout></a>
        </v-layout>


        <v-layout v-if="origin" align-center justify-space-between>
            <h5 class="font-weight-thin subheading">Origine:</h5>
            <h5 class="font-weight-thin subheading">{{origin}}</h5>
        </v-layout>

        <v-layout v-if="externId" align-center justify-space-between>
            <h5 class="font-weight-thin subheading">ID externe:</h5>
            <h5 class="font-weight-thin subheading">{{externId}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="store">
            <h5 class="font-weight-thin subheading">Magasins:</h5>
            <h5 class="font-weight-thin subheading">{{store}}</h5>
        </v-layout>

        <v-divider class="my-2"/>

        <v-layout align-center justify-space-between v-if="date">
            <h5 class="font-weight-thin subheading">Valable depuis:</h5>
            <h5 class="font-weight-thin subheading">{{date}}</h5>
        </v-layout>

        <v-layout align-center justify-space-between v-if="dateUntil">
            <h5 class="font-weight-thin subheading">Valable jusqu'au:</h5>
            <h5 class="font-weight-thin subheading">{{dateUntil}}</h5>
        </v-layout>

        <template v-if="comment">
            <v-divider class="my-2"/>
            <h5 class="font-weight-thin subheading">Commentaire:</h5>
            <div class="font-weight-thin ml-1" v-html="comment" style="white-space: pre-line"></div>
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
        methods: {
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
            source() {
                return this.trunk && this.trunk.source
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