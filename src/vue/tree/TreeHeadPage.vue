<template>
    <v-card>
        <v-layout column>
            <tree-card :tree="tree" class="mt-3">
                <v-card-actions>
                    <v-btn icon flat @click="setFlipped(true)"><v-icon color="red">favorite_border</v-icon></v-btn>
                    <open-message :section="section" no-text/>
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
    import {mapMutations} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import {name} from "../../services/calculations"

    export default {
        name: "tree-headpage",
        components: {OpenMessage, FragmentSelect, TreeCard, Description},
        props: ['tree', 'value'],
        methods: {
            emitInput(idx) {
                this.$emit('input', idx)
            },
            ...mapMutations({setFlipped: Do.SET_TREE_CARD_FLIPPED}),
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