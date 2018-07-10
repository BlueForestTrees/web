<template>
    <span>

    <v-list v-if="!showBilan && hasItems" dense>
        <v-divider/>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">RESSOURCES</h4>
                <span>Energie, travail, matière première, composants.</span>
            </v-tooltip>
            <v-spacer/>

            <v-tooltip top>
                <v-btn depressed flat icon small @click="showBilan = true" slot="activator">
                    <v-icon color="grey darken-1">view_module</v-icon>
                </v-btn>
                <span>Afficher le bilan des ressources</span>
            </v-tooltip>

        </v-subheader>

        <template v-for="item in items">
            <v-list-tile avatar :key="'i'+item.trunk.name">
                <v-icon :style="{color:item.trunk.color,marginRight:'0.2em'}">lens</v-icon>
                {{qtUnitName(item.trunk) }}
            </v-list-tile>
        </template>
    </v-list>

    <v-list v-if="showBilan && hasItems" dense>
        <v-divider/>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">RESSOURCES (bilan)</h4>
                <span>Energie, travail, matière première, composants.</span>
            </v-tooltip>
            <v-spacer/>

            <v-tooltip top>
                <v-btn depressed flat icon small @click="showBilan = false" slot="activator">
                    <v-icon color="grey darken-1">view_stream</v-icon>
                </v-btn>
                <span>Afficher les ressources</span>
            </v-tooltip>

        </v-subheader>

        <template v-for="item in bilanItems">
            <v-list-tile avatar :key="'b'+item.name">
                <v-icon :style="{color:item.color,marginRight:'0.2em'}">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </template>
    </v-list>
    </span>
</template>

<script>
    import On from "../../const/on";
    import {mapActions} from 'vuex';
    import QtUnit from "../common/QtUnit";
    import selectable from "../mixin/Selectable";
    import {getRandomColor, qtUnitName} from "../../services/calculations";

    export default {
        components: {
            QtUnit
        },
        mixins: [selectable],
        props: ['tree'],
        data() {
            return {
                showBilan: false
            }
        },
        computed: {
            items: function () {
                return this.tree.roots.items;
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0;
            },
            bilanItems: function () {
                return this.tree.tank && this.tree.tank.items;
            }
        },
        methods: {
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            ...mapActions({
                dispatchDeleteLink: On.DELETE_LINK,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
            qtUnitName, getRandomColor
        }
    }
</script>