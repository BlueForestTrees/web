<template>
    <router-link :to="{name:GO.TREE, params:{_id:tree._id, bqt:treeBqt(tree)}}" class="full-width">
        <v-toolbar class="elevation-0">
            <v-spacer/>
            <div class="hand align font-weight-medium">{{noQt ? name(tree) : qtUnitName(tree)}}</div>
            <v-spacer/>
        </v-toolbar>
    </router-link>
</template>

<script>
    import {qtUnitName, name, treeBqt} from "../../services/calculations"
    import {GO} from "../../const/go"
    import TreeCardFront from "../tree/QtUnitName"

    export default {
        name: "treeLink",
        components: {TreeCardFront},
        props: {tree: {type: Object}, noQt: {type: Boolean, default: false}},
        data: () => ({GO}),
        methods: {
            qtUnitName, treeBqt, name
        }
    }
</script>