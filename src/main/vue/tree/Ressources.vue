<template>
    <v-list v-if="hasItems">
        <v-subheader>
            <v-tooltip top>
                <span slot="activator">Ressources</span>
                <span>Composants, Energie, Travail, Matière première...</span>
            </v-tooltip>
            <v-spacer/>

            <span v-if="!bilan">
                <v-icon @click="open" style="cursor: pointer" v-if="oneSelected()">launch</v-icon>
            </span>

            <v-tooltip top>
                <v-btn-toggle v-model="bilanFlag" slot="activator">
                    <v-btn flat>
                        <v-icon>filter_list</v-icon>
                    </v-btn>
                </v-btn-toggle>
                <span>Montrer les ressources primaires</span>
            </v-tooltip>

        </v-subheader>

        <template v-if="bilan" v-for="item in bilanItems">
            <v-divider/>
            <v-list-tile avatar :key="'b'+item.name" @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>

        <template v-if="!bilan" v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="'i'+item.trunk.name" @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.trunk.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.trunk.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import On from "../../const/on";
    import {mapActions} from 'vuex';
    import QtUnit from "../common/QtUnit";
    import selectable from "../mixin/Selectable";

    export default {
        components: {
            QtUnit
        },
        mixins: [selectable],
        props: ['tree'],
        data() {
            return {
                bilanFlag: null
            }
        },
        computed: {
            bilan: function () {
                return this.bilanFlag === 0;
            },
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
        }
    }
</script>