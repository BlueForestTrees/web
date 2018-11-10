<template>
    <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
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