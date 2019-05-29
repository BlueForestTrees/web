<template>
    <v-layout column align-center mb-1>

        <transition-expand>
            <description-editor v-if="isEditing" :value="tree.trunk" @saved="save"/>
        </transition-expand>
        <transition-expand>
            <description v-if="!isEditing" :tree="tree"/>
        </transition-expand>
        <v-btn v-if="isEditing" icon @click="unedit">
            <v-icon color="grey">close</v-icon>
        </v-btn>
        <v-btn v-else-if="canEditDescription" icon @click="edit">
            <v-icon color="grey">edit</v-icon>
        </v-btn>

    </v-layout>
</template>
<script>
    import Description from "./Description"
    import TreeCard from "./TreeCard"
    import FragmentSelect from "./FragmentSelect"
    import Do from "../../const/do"
    import {mapMutations, mapActions, mapGetters} from "vuex"
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
    import TransitionExpand from "../common/TransitionExpand"

    const DescriptionEditor = () => import("./DescriptionEditor")

    export default {
        name: "DescriptionSubPage",
        components: {TransitionExpand, DescriptionEditor, FacetsSubPage, Photo, QtUnitName, Closer, TreeFab, SubpageTitle, Subheader, OpenMessage, FragmentSelect, TreeCard, Description},
        props: ['tree'],
        data: () => ({isEditing: false}),
        methods: {
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            ...mapActions({
                updateTree: On.UPDATE_TREE
            }),
            edit() {
                this.isEditing = true
            },
            save(trunk) {
                Object.assign(this.tree.trunk, trunk)
                this.unedit()
            },
            unedit() {
                this.isEditing = false
            }
        },
        computed: {
            ...mapGetters(['isAdmin', 'isOwner']),
            canEditDescription() {
                return this.isAdmin || this.isOwner(this.tree.trunk)
            }
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