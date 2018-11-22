<template>
    <span @click="selectable && !qtFlipped && toggleSelect(tree)" :style="{background: isSelected(tree) ? '#D8E9F5' : '', height:'100%'}">
        <v-layout justify-center>
            <card3d v-if="trunk" :flipped="qtFlipped">
                <span slot="front">
                    <h1 class="display-2 align" @click.stop="flip">{{qtUnit(tree)}}</h1>
                    <h5 v-if="qtSelection" class="align font-weight-thin">{{qtUnit(qtSelection.quantity)}} / {{qtUnit(qtSelection.freq,{hideOne:true})}}</h5>
                    <h3 class="display-1 align font-weight-thin">{{name(tree)}}</h3>
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
            },
            qtSelection: function () {
                return this.tree && this.tree.selection
            }
        }
    }
</script>