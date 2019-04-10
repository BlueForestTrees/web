<template>
    <div>
        <v-card class="ma-2 elevation-5">
            <v-layout column align-center mb-1>
                <subpage-title title="Description" sub color="whitegrey"/>
                <photo :trunk="tree.trunk" size="200" class="my-3"/>
                <description :tree="tree"/>
            </v-layout>
        </v-card>
        <facets-sub-page :tree="tree" />
    </div>
</template>
<script>
    import Description from "./Description"
    import TreeCard from "./TreeCard"
    import FragmentSelect from "./FragmentSelect"
    import Do from "../../const/do"
    import {mapMutations, mapActions} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import On from "../../const/on"
    import Subheader from "./Subheader"
    import SubpageTitle from "./SubpageTitle"
    import TreeFab from "./TreeFab"
    import Closer from "../common/Closer"
    import QtUnitName from "./QtUnitName"
    import Photo from "../common/Photo"
    import {OWNER, TRUNK} from "../../const/fragments"
    import FacetsSubPage from "./FacetsSubPage"

    export default {
        name: "DescriptionSubPage",
        components: {FacetsSubPage, Photo, QtUnitName, Closer, TreeFab, SubpageTitle, Subheader, OpenMessage, FragmentSelect, TreeCard, Description},
        props: ['tree'],
        methods: {
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            ...mapActions({
                updateTree: On.UPDATE_TREE
            })
        },
        watch: {
            tree: function (tree) {
                if (tree) {
                    const toUpdate = []
                    !toUpdate[TRUNK] && toUpdate.push(TRUNK)
                    !toUpdate[OWNER] && toUpdate.push(OWNER)
                    toUpdate.length && this.updateTree({tree, fragments: toUpdate})
                }
            }
        }
    }
</script>