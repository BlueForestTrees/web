<template>
    <v-layout column align-center>
        <subpage-title :title="qtUnitName(tree)" color="primary">
            <v-btn slot="right" icon @click="$emit('close')">
                <v-icon color="white">chevron_left</v-icon>
            </v-btn>
        </subpage-title>
        <v-layout justify-center>
            <open-message slot="right" :section="section" no-text/>
            <v-btn icon slot="left" @click="$emit('editQt')">
                <v-icon class="carton logo-petit"/>
            </v-btn>
            <v-btn icon flat @click="deleteTree">
                <v-icon color="grey">delete</v-icon>
            </v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
    import {mapActions} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import SubpageTitle from "./SubpageTitle"
    import {name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import Btn from "../common/btn"

    export default {
        name: "TreeRubanHead",
        components: {Btn, SubpageTitle, OpenMessage},
        props: {tree: Object},
        methods: {
            qtUnitName, name,
            ...mapActions({
                deleteTree: On.DELETE_OPENED_TREE
            }),
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
            },
        },
    }
</script>

<style scoped>

</style>