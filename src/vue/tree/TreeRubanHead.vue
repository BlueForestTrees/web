<template>
    <v-layout column align-center>
        <subpage-title :title="name(tree)" color="primary" sub>
            <v-btn slot="right" icon @click="$emit('close')">
                <v-icon color="white">chevron_left</v-icon>
            </v-btn>
        </subpage-title>
        <v-layout justify-center>
            <open-message slot="right" :section="section" no-text/>
            <v-btn icon slot="left" @click="$emit('editQt')">
                <v-icon class="carton logo-petit"/>
            </v-btn>
            <btn :enabled="tree !== stateTree" @click="nodeNav" icon-class="trunk logo"></btn>
            <v-btn icon flat @click="deleteOpenedTree">
                <v-icon color="grey">delete</v-icon>
            </v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import SubpageTitle from "./SubpageTitle"
    import {name} from "../../services/calculations"
    import On from "../../const/on"
    import Btn from "../common/btn"
    import Do from "../../const/do"

    export default {
        name: "TreeRubanHead",
        components: {Btn, SubpageTitle, OpenMessage},
        props: {tree: Object},
        methods: {
            name,
            ...mapMutations({
                openTree: Do.OPEN_TREE
            }),
            ...mapActions({
                deleteOpenedTree: On.DELETE_OPENED_TREE,
            }),
            nodeNav() {
                this.openTree(this.tree)
            }
        },
        computed: {
            ...mapState({stateTree: s => s.tree}),
            section() {
                return {
                    title: `Message pour "${name(this.tree)}"`,
                    filter: {
                        type: 'tree',
                        topicId: this.tree._id
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>