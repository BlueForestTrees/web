<template>
        <span>

            <transition name="slide-fade">
                <v-toolbar v-if="anySelected" app dark class="elevation-0" color="blue">
                    <v-toolbar-items>
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)">ouvrir
                                <v-icon>category</v-icon>
                            </v-btn>
                            <span style="pointer-events: none">Ouvrir</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="oneSelected" flat @click=""><span class="hidden-xs-only">modifier</span>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <span style="pointer-events: none">Modifier</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="oneSelected" flat @click="remove(oneSelected)"><span
                                    class="hidden-xs-only">supprimer</span>
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <span style="pointer-events: none">Supprimer</span>
                        </v-tooltip>
                    </v-toolbar-items>
                    <v-spacer/>
                    <v-toolbar-items>
                        <v-tooltip bottom>
                            <v-btn slot="activator" icon dense @click="unselect()">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <span style="pointer-events: none">Fermer</span>
                        </v-tooltip>
                    </v-toolbar-items>
                </v-toolbar>
            </transition>

            <subheader icon="call_split" title="USAGE"/>

            <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="blue">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item.trunk)}}
            </v-list-tile>

        </span>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import goTree from "../mixin/GoTree"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            QtUnit
        },
        props: ['tree'],
        mixins: [selectable, goTree],
        computed: {
            items: function () {
                return this.tree && this.tree.branches
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            },
        },
        methods: {
            remove(item) {
                this.deleteBranch(item.linkId)
                this.unselect()
            },
            ...mapActions({
                deleteBranch: On.DELETE_BRANCH,
                dispatchLoadBranches: On.LOAD_BRANCHES
            }),
            getRandomColor, qtUnitName
        }
    }
</script>