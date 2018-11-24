<template>
    <span @click="selectable && !qtFlipped && toggleSelect(tree)" :style="{background: isSelected(tree) ? '#D8E9F5' : '', height:'100%'}">
        <v-layout justify-center>
            <card3d v-if="trunk" :flipped="qtFlipped">
                <span slot="front" @click.stop="flip">
                    <tree-card-front :tree="tree"/>
                </span>
                <v-card slot="back">
                    <v-container my-0 py-0>
                        <quantity-selection :tree="tree" @close="flip" @changeQuantity="changeQuantity" @changeSelection="changeSelection"/>
                    </v-container>
                </v-card>
            </card3d>
        </v-layout>
    </span>
</template>

<script>
    import {mapActions} from "vuex"
    import {qtUnit, name} from "../../services/calculations"
    import selectable from "../mixin/Selectable"
    import Card3d from "../common/Card3d"
    import QuantitySelection from "./QuantitySelection"
    import On from "../../const/on"
    import TreeCardFront from "./TreeCardFront"
    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")


    export default {
        name: "tree-card",
        components: {Photo, TreeCardFront, QuantitySelection, Card3d},
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
                changeSelection: On.CHANGE_SELECTION,
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