<template>
    <router-link :to="{name:GO.TREE, params:{_id:tree._id, bqt:treeBqt(tree)}}">
        <div class="align font-weight-medium display-1">{{qtUnitName(tree)}}</div>
    </router-link>
</template>

<script>
    import {qtUnitName, name, selectionBqt, treeBqt} from "../../services/calculations"
    import {GO} from "../../const/go"
    import TreeCardFront from "../tree/QtUnitName"

    export default {
        name: "treeLink",
        components: {TreeCardFront},
        props: ['tree'],
        data: () => ({GO}),
        methods: {
            qtUnitName, treeBqt
        }
    }
</script>