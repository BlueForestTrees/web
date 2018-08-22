<template>
    <v-card>
        <v-list dense>
            <v-subheader>
                <h4 slot="activator">BILAN EXTERNALITES</h4>
            </v-subheader>

            <template v-for="item in items">
                <v-list-tile avatar :key="'i'+item._id">
                    <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName(item)}}
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
    import {Dial} from "../../const/dial"
    import {qtUnitName} from "../../services/calculations"
    import QtUnit from "../common/QtUnit"

    export default {
        components: {
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