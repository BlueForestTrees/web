<template>
    <v-container @click="selectable && toggleSelect(tree)" :style="{background: isSelected(tree) ? '#D8E9F5' : '', height:'100%'}">
        <v-layout column fill-height>
            <v-layout :column="$vuetify.breakpoint.xsOnly" align-center>
                <svg width="30%" height="30%" viewBox="-10 -10 20 20" class="not-too-height">
                    <circle cx="0" cy="0" r="8" :stroke="trunk && trunk.color || 0" fill="none"></circle>
                </svg>
                <v-flex>
                    <card3d :flipped="qtFlipped" v-if="trunk">
                        <h1 slot="front" class="display-3 align" v-html="qtUnit(trunk)" @click.stop="flip"></h1>
                        <quantity-selection slot="back" :tree="tree" @close="flip" @change="changeQuantity"/>
                    </card3d>
                </v-flex>
            </v-layout>
            <v-flex>
                <H3 class="display-1 align" v-html="name(trunk)"></H3>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapActions} from "vuex"
    import {qtUnit, name} from "../../services/calculations"
    import selectable from "../mixin/Selectable"
    import Card3d from "../common/Card3d"
    import QuantitySelection from "../dialog/QuantitySelection"
    import On from "../../const/on"

    export default {
        name: "tree-card",
        components: {QuantitySelection, Card3d},
        mixins: [selectable],
        props: {
            tree: Object,
            noBar: {type: Boolean, default: false},
            selectable: {type: Boolean, default: false}
        },
        data() {
            return {
                qtFlipped: false
            }
        },
        methods: {
            ...mapActions({
                changeQuantity: On.CHANGE_QUANTITY,
                unselect: On.UNSELECT
            }),
            flip() {
                this.qtFlipped = !this.qtFlipped
                this.unselect()
            },
            qtUnit, name
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>