<template>
    <v-card class="ma-2">
    <v-layout column align-center mb-1>
        <subpage-title title="Description" sub color="whitegrey"><open-message slot="right" :section="section" no-text/></subpage-title>

        <photo :trunk="tree.trunk" size="200" class="my-3"/>

        <description :tree="tree"/>

    </v-layout>
    </v-card>
</template>
<script>
    import Description from "./Description"
    import TreeCard from "./TreeCard"
    import FragmentSelect from "./FragmentSelect"
    import Do from "../../const/do"
    import {mapMutations, mapActions} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import {name} from "../../services/calculations"
    import On from "../../const/on"
    import Subheader from "./Subheader"
    import SubpageTitle from "./SubpageTitle"
    import TreeFab from "./TreeFab"
    import Closer from "../common/Closer"
    import QtUnitName from "./QtUnitName"
    import Photo from "../common/Photo"
    import {OWNER, TRUNK} from "../../const/fragments"

    export default {
        name: "tree-headpage",
        components: {Photo, QtUnitName, Closer, TreeFab, SubpageTitle, Subheader, OpenMessage, FragmentSelect, TreeCard, Description},
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
                    if (!tree.trunk) {
                        this.updateTree({tree}, [TRUNK])
                    }
                    if (!tree.owner) {
                        this.updateTree({tree}, [OWNER])
                    }
                }
            }
        },
        computed: {
            section() {
                return {
                    title: `Message pour "${name(this.tree)}"`,
                    filter: {
                        type: 'tree',
                        topicId: this.tree._id
                    }
                }
            }
        },
    }
</script>