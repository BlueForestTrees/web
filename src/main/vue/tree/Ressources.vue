<template>
    <v-card>

    <transition name="slide-fade">
        <v-toolbar v-if="anySelected" app dark class="elevation-0" color="green lighten-2">
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="unselect()"><v-icon>close</v-icon></v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </v-toolbar-items>
            <v-spacer/>
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
                    <v-btn slot="activator" v-if="anySelected" flat @click="remove(anySelected)"><span class="hidden-xs-only">supprimer</span><v-icon>delete</v-icon></v-btn>
                    <span style="pointer-events: none">Supprimer</span>
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>
    </transition>

    <v-list v-if="!showBilan && hasItems" dense>
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

        <v-list-tile v-for="item in items" v-if="!item.trunk.relativeTo" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
            {{qtUnitName(item.trunk)}}
        </v-list-tile>
    </v-list>

    <v-list v-if="showBilan && hasItems" dense>
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
    </v-card>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"
    import goTree from "../mixin/GoTree"
    import {getRandomColor, qtUnitName} from "../../services/calculations"

    export default {
        components: {
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
                return this.tree && this.tree.roots && this.tree.roots
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            },
            bilanItems: function () {
                return this.tree && this.tree.tank && this.tree.tank.items
            }
        },

        methods: {
            goRoot: function (root) {
                this.dispatchGoRoot({treeId: this.tree._id, rootId: root._id})
                this.unselect()
            },
            remove(items) {
                for (let i = 0; i < items.length; i++) {
                    this.deleteLink(items[i].linkId)
                }
                this.unselect()
            },

            ...mapActions({
                dispatchGoRoot: On.GO_ROOT,
                deleteLink: On.DELETE_LINK,
                dispatchLoadRoots: On.LOAD_ROOTS
            }),
            qtUnitName, getRandomColor
        }
    }
</script>