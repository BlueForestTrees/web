<template>
    <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
        <template slot="bar" slot-scope="{ s }">
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)"><span class="hidden-xs-only">ouvrir</span>
                        <v-icon>category</v-icon>
                    </v-btn>
                    <span style="pointer-events: none">Ouvrir</span>
                </v-tooltip>
                <v-spacer/>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="unselect()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </v-toolbar-items>
        </template>
        <open-message slot="no-items" :section="section"/>
    </selectable-list>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import goTree from "../mixin/GoTree"
    import Subheader from "./Subheader"
    import OpenMessage from "../common/OpenMessage"
    import SelectableList from "../common/SelectableList"

    export default {
        components: {
            SelectableList,
            OpenMessage,
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
            section: function () {
                return {
                    title: `On se sait pas encore pour quoi "${this.tree.trunk && this.tree.trunk.name}" est utilisé. Une idée?`,
                    filter: {
                        type: 'trunk-branch',
                        topicId: this.tree._id
                    }
                }
            }
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