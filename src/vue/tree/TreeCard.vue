<template>
    <span class="fill-height">
        <v-layout justify-center>
            <card3d v-if="trunk" :flipped="qtFlipped">
                <span slot="front" @click.stop="flip" class="hand">
                    <tree-card-front :tree="tree"/>
                </span>
                <v-card slot="back">
                    <v-container my-0 py-0>
                        <selection-picker :tree="tree" @close="flip" @change="selectionChanged"/>
                    </v-container>
                </v-card>
            </card3d>
        </v-layout>
    </span>
</template>

<script>
    import {mapActions} from "vuex"
    import {qtUnit, name} from "../../services/calculations"
    import Card3d from "../common/Card3d"
    import On from "../../const/on"
    import TreeCardFront from "./TreeCardFront"
    import SelectionPicker from "./SelectionPicker"

    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")


    export default {
        name: "tree-card",
        components: {SelectionPicker, Photo, TreeCardFront, Card3d},
        props: {
            tree: Object,
            noBar: {type: Boolean, default: false},
        },
        data() {
            return {
                qtFlipped: false
            }
        },
        methods: {
            ...mapActions({
                saveSelection: On.SAVE_SELECTION,
                applySelection: On.APPLY_SELECTION
            }),
            selectionChanged(selection) {
                this.saveSelection(selection)
                this.applySelection(selection)
                this.flip()
            },
            flip() {
                this.qtFlipped = !this.qtFlipped
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