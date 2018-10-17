<template>
    <v-list>
        <template v-if="hasItems" v-for="item in items">
            <v-layout row align-center :key="item._id">
                <v-icon :style="{color:item.color}">lens</v-icon>
                {{qtUnitName(item)}}
            </v-layout>
            <v-divider/>
        </template>
        <v-list-tile v-if="!hasItems">
            <h5>Pas encore d'informations</h5>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {Dial} from "../../const/dial"
    import {qtUnitName} from "../../services/calculations"
    import QtUnit from "../common/QtUnit"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            QtUnit,
        },
        data() {
            return {
                Dial,
                showBilan: false
            }
        },

        props: ['tree'],
        computed: {
            hasItems: function () {
                return this.items && !!this.items.length && this.items.length > 0
            },
            items: function () {
                return this.tree && this.tree.impactsTank
            }

        },
        methods: {
            qtUnitName
        },
    }
</script>