<template>
    <v-card>
        <v-layout column>

            <subpage-title iconClass="scope-tree logo" title="Produit">
                <tree-fab slot="right" v-if="tree.trunk" @nav="v=>$emit('nav', v)"/>
            </subpage-title>

            <tree-card :tree="tree" class="mt-3">
                <v-card-actions>
                    <v-btn icon flat @click="setFlipped(true)">
                        <v-icon color="red">favorite_border</v-icon>
                    </v-btn>
                    <v-btn icon flat @click="goInfo">
                        <v-icon class="voice logo-petit"/>
                    </v-btn>
                    <open-message :section="section" no-text/>
                    <v-btn icon flat @click="deleteTree">
                        <v-icon color="grey">delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </tree-card>
            <description :tree="tree" class="my-5"/>

            <v-divider/>
            <fragment-select :value="value" @input="emitInput"/>
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

    export default {
        name: "tree-headpage",
        components: {TreeFab, SubpageTitle, Subheader, OpenMessage, FragmentSelect, TreeCard, Description},
        props: ['tree', 'value'],
        methods: {
            emitInput(idx) {
                this.$emit('input', idx)
            },
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            ...mapActions({
                deleteTree: On.DELETE_OPENED_TREE,
                goInfo: On.GO_CREATE_INFO
            })
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