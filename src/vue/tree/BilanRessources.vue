<template>
    <span>
        <v-list-tile avatar :key="item.trunk.name" v-for="item in items">
            <v-icon :style="{color:item.trunk.color,marginRight:'0.2em'}">lens</v-icon>{{qtUnitName(item.trunk) }}
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
                return this.tree && this.tree.tank
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
                deleteRoot: On.DELETE_ROOT
            }),
            qtUnitName, getRandomColor
        }
    }
</script>