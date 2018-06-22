<template>
    <v-list v-if="hasBilanItems" dense>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">IMPACT{{showBilan || !hasItems ? ' (bilan)' : ''}}</h4>
                <span>Déchets, Pollutions, etc.</span>
            </v-tooltip>
            <v-spacer/>

            <v-tooltip top v-if="hasItems">
                <v-btn depressed flat icon small @click="showBilan = !showBilan" slot="activator">
                    <v-icon color="grey darken-1">{{showBilan ? 'view_stream' : 'view_module'}}</v-icon>
                </v-btn>
                <span>{{showBilan ? 'Afficher les impacts' : 'Afficher le bilan'}}</span>
            </v-tooltip>

        </v-subheader>

        <template v-if="showBilan || !hasItems" v-for="item in bilanItems">
            <v-divider/>
            <v-list-tile avatar :key="'b'+item.name">
                <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </template>

        <template v-else v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="'i'+item.name">
                <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item)}}
            </v-list-tile>
        </template>

    </v-list>
</template>

<script>
    import {mapActions} from 'vuex';
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {getRandomColor, hasQuantity, qtUnitName} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import {isEmpty} from 'lodash';
    import selectable from "../mixin/Selectable";

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
        mixins: [selectable],
        props: ['tree'],
        computed: {
            items: function () {
                return this.impacts && this.impacts.items;
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0;
            },
            bilanItems: function () {
                return this.tree && this.tree.impactsTank && this.tree.impactsTank.items;
            },
            hasBilanItems: function () {
                return this.bilanItems && this.bilanItems.length && this.bilanItems.length > 0;
            },
            impacts: function () {
                return this.tree && this.tree.impacts;
            }
        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),

            deleteItems() {
                this.dispatchDeleteImpacts({impacts: this.tree.impacts, toDelete: this.selection});
            },
            hasQuantity, getRandomColor, qtUnitName
        },
    }
</script>