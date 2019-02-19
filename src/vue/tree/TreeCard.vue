<template>
    <v-layout justify-center>
        <card3d v-if="trunk" :flipped="flipped">
            <template slot="front">
                <photo :trunk="trunk" size="200" class="mb-2"/>
                <qt-unit-name :tree="tree"/>
                <slot/>
            </template>
            <v-card slot="back">
                <selection-picker :tree="tree" @close="flip" @pick="pickSelection">
                    <v-icon large color="red">favorite_bordered</v-icon>
                </selection-picker>
            </v-card>
        </card3d>
    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex"
    import {qtUnit, name} from "../../services/calculations"
    import Card3d from "../common/Card3d"
    import On from "../../const/on"
    import SelectionPicker from "./SelectionPicker"
    import QtUnitName from "./QtUnitName"
    import Do from "../../const/do"

    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")


    export default {
        name: "tree-card",
        components: {QtUnitName, SelectionPicker, Photo, Card3d},
        props: {
            tree: Object,
            noBar: {type: Boolean, default: false},
        },
        methods: {
            ...mapActions({
                saveApplySelection: On.SAVE_APPLY_SELECTION,
            }),
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            pickSelection(selection) {
                this.saveApplySelection(selection)
                this.flip()
            },
            flip() {
                this.setFlipped(!this.flipped)
            },
            qtUnit, name
        },
        computed: {
            ...mapState({flipped: s => s.nav.tree.cardFlipped}),
            trunk: function () {
                return this.tree && this.tree.trunk
            },
            selection: function () {
                return this.tree && this.tree.selection
            },
            starIcon() {
                return this.selection ? "star" : "star_border"
            }
        }
    }
</script>