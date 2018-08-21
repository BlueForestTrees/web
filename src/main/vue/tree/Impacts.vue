<template>
    <v-card>
        <v-list dense>
            <v-subheader>
                <v-tooltip top>
                    <h4 slot="activator">EXTERNALITES</h4>
                    <span>Déchets, Pollutions, etc.</span>
                </v-tooltip>
            </v-subheader>

            <template v-if="!showBilan && hasItems" v-for="item in items">
                <v-list-tile avatar :key="'i'+item._id">
                    <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName(item)}}
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
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
                return this.tree && this.tree.impacts
            }

        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),
            qtUnitName
        },
    }
</script>