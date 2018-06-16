<template>
    <v-list v-if="hasItems" dense>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">RESSOURCE{{bilan ? ' (bilan)' : ''}}</h4>
                <span>Energie, travail, matière première, composants.</span>
            </v-tooltip>
            <v-spacer/>

            <span v-if="!bilan">
                <v-icon @click="open" style="cursor: pointer" v-if="oneSelected()">launch</v-icon>
            </span>

            <v-tooltip top>
                <v-btn depressed flat icon small @click="bilan = !bilan" slot="activator">
                    <v-icon color="grey darken-1">{{bilan ? 'view_stream' : 'view_module'}}</v-icon>
                </v-btn>
                <span>{{bilan ? 'Afficher les ressources' : 'Afficher le bilan'}}</span>
            </v-tooltip>

        </v-subheader>

        <template v-if="bilan" v-for="item in bilanItems">
            <v-divider/>
            <v-list-tile avatar :key="'b'+item.name">
                <v-icon :style="{color:item.color,marginRight:'0.2em'}">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </template>

        <template v-if="!bilan" v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="'i'+item.trunk.name">
                <v-icon :style="{color:item.trunk.color,marginRight:'0.2em'}">lens</v-icon>
                {{qtUnitName(item.trunk) }}
            </v-list-tile>
        </template>
    </v-list>
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
                bilan: false
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