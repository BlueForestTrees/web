<template>
    <card3d v-if="trunk" :flipped="flipped">
        <template slot="front">
            <photo :trunk="trunk" size="200" class="mb-2"/>
            <slot/>
        </template>
        <v-card slot="back">
            <selection-picker :value="selection" @close="flip" @pick="pickSelection"/>
        </v-card>
    </card3d>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex"
    import {qtUnit, name, selectionFromTree} from "../../services/calculations"
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
                snackError: On.SNACKERROR
            }),
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            pickSelection(selection) {
                this.saveApplySelection({tree: this.tree, selection})
                    .then(this.flip)
                    .catch(this.snackError)
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
            selection() {
                return this.tree.selection || selectionFromTree(this.tree)
            },
            starIcon() {
                return this.selection ? "star" : "star_border"
            }
        }
    }
</script>