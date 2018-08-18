<template>
    <v-list dense>
        <v-divider/>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">EXTERNALITES{{showBilan || !hasItems ? ' (bilan)' : ''}}</h4>
                <span>Déchets, Pollutions, etc.</span>
            </v-tooltip>
            <v-spacer/>

            <v-tooltip top v-if="hasItems">
                <v-btn depressed flat icon small @click="showBilan = !showBilan" slot="activator">
                    <v-icon color="grey darken-1">{{showBilan ? 'view_stream' : 'view_module'}}</v-icon>
                </v-btn>
                <span>{{showBilan ? 'Afficher les externalités' : 'Afficher le bilan des externalités'}}</span>
            </v-tooltip>
        </v-subheader>

        <template v-if="showBilan || !hasItems" v-for="item in bilanItems">
            <v-list-tile avatar :key="'b'+item._id">
                <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </template>

        <template v-if="!showBilan && hasItems" v-for="item in items">
            <v-list-tile avatar :key="'i'+item._id">
                <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item)}}
            </v-list-tile>
        </template>

    </v-list>
</template>

<script>
    import {mapActions} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {getRandomColor, hasQuantity, qtUnitName} from "../../services/calculations"
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
            },

            bilanItems: function () {
                return this.tree && this.tree.impactsTank && this.tree.impactsTank.items
            },
            hasBilanItems: function () {
                return this.bilanItems && this.bilanItems.length && this.bilanItems.length > 0
            }
        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),

            hasQuantity, getRandomColor, qtUnitName
        },
    }
</script>