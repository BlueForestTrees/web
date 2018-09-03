<template>
        <span>
            <subheader icon="keyboard_tab" title="EXTERNALITES"/>

            <template v-for="item in items">
                <v-list-tile avatar :key="item._id">
                    <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName(item)}}
                </v-list-tile>
            </template>
        </span>
</template>

<script>
    import {mapActions} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {qtUnitName} from "../../services/calculations"
    import QtUnit from "../common/QtUnit"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            QtUnit,
        },
        data() {
            return {
                Dial,
                showBilan: false
            }
        },

        props: ['tree'],
        computed: {
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            },
            items: function () {
                return this.tree && this.tree.impacts
            }

        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),
            qtUnitName
        },
    }
</script>