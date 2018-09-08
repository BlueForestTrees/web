<template>
    <span>
            <v-toolbar v-if="anySelected" app dark class="elevation-5" color="blue">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat @click="goTree(oneSelected)"><span class="hidden-xs-only">ouvrir</span><v-icon>category</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat @click="goRoot(oneSelected)"><span class="hidden-xs-only">modifier</span><v-icon>edit</v-icon></v-btn>
                        <span style="pointer-events: none">Modifier</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="anySelected" flat @click="remove(anySelected)"><span class="hidden-xs-only">supprimer</span><v-icon>delete_forever</v-icon></v-btn>
                        <span style="pointer-events: none">Supprimer</span>
                    </v-tooltip>
                </v-toolbar-items>
                <v-spacer/>
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </v-toolbar-items>
            </v-toolbar>

        <v-list-tile v-for="item in items" v-if="!item.relativeTo" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
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
    import goTree from "../mixin/GoTree"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            QtUnit
        },
        mixins: [selectable, goTree],
        props: ['tree'],
        data() {
            return {
                showBilan: false
            }
        },
        computed: {
            items: function () {
                return this.tree && this.tree.roots
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            }
        },

        methods: {
            goRoot: function (root) {
                this.dispatchGoRoot({treeId: this.tree._id, rootId: root._id})
                this.unselect()
            },
            remove(items) {
                for (let i = 0; i < items.length; i++) {
                    this.deleteRoot(items[i].linkId)
                }
                this.unselect()
            },

            ...mapActions({
                dispatchGoRoot: On.GO_ROOT,
                deleteRoot: On.DELETE_ROOT,
                dispatchLoadRoots: On.LOAD_ROOTS
            }),
            qtUnitName, getRandomColor
        }
    }
</script>