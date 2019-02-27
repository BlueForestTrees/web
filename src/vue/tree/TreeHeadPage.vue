<template>
    <v-card>

        <v-layout column align-center>

            <subpage-title iconClass="blueforest logo" title="Produit">
                <closer slot="right" @close="$emit('close')"/>
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

        </v-layout>
        <v-divider/>
        <fragment-select :value="value" @change="i=>$emit('input', i)"/>
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

    export default {
        name: "tree-headpage",
        components: {Closer, TreeFab, SubpageTitle, Subheader, OpenMessage, FragmentSelect, TreeCard, Description},
        props: ['tree', 'value'],
        methods: {
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
            ...mapActions({
                goInfo: On.GO_CREATE_INFO,
                deleteTree: On.DELETE_OPENED_TREE
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