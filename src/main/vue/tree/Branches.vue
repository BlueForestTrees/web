<template>
    <v-list v-if="hasItems">

        <transition name="slide-fade">
            <v-toolbar v-if="selectionNotEmpty" app dark class="elevation-0" color="green lighten-2">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)">ouvrir<v-icon>launch</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat @click=""><span class="hidden-xs-only">modifier</span><v-icon>edit</v-icon></v-btn>
                        <span style="pointer-events: none">Modifier</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat @click="remove(oneSelected)"><span class="hidden-xs-only">supprimer</span><v-icon>delete</v-icon></v-btn>
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
        </transition>

        <v-divider/>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">USAGE</h4>
                <span>Utilisé pour...</span>
            </v-tooltip>
        </v-subheader>

        <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
            {{qtUnitName(item.trunk)}}
        </v-list-tile>

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
        props: ['tree'],
        mixins: [selectable],
        computed: {
            items: function () {
                return this.tree && this.tree.branches && this.tree.branches.items;
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0;
            },
        },
        methods: {
            qtUnitName,
            remove(item) {
                this.deleteLink({left: item, right: this.tree});
                this.unselect();
            },
            ...mapActions({
                deleteLink: On.DELETE_LINK,
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            getRandomColor, qtUnitName
        }
    }
</script>