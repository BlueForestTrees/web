<template>
        <span>
                <v-list-tile avatar :key="'i'+item._id" v-for="item in items">
                    <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName(item)}}
                </v-list-tile>
        </span>
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
                return this.items && this.items.length && this.items.length > 0
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