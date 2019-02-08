<template>
    <router-link :to="{name:GO.TREE, params:{_id:selection.trunkId, bqt:selectionBqt(selection)}}">
        <div class="align font-weight-medium display-1">{{qtUnit(selection)}}</div>
        <div class="align font-weight-thin display-1">{{name(selection)}}</div>
    </router-link>
</template>

<script>
    import {qtUnit, qtUnitName, name, selectionBqt} from "../../services/calculations"
    import {GO} from "../../const/go"
    import TreeCardFront from "../tree/QtUnitName"

    export default {
        name: "selection-link",
        components: {TreeCardFront},
        props: ['selection'],
        data: () => ({GO}),
        methods: {
            qtUnitName, qtUnit, name, selectionBqt
        }
    }
</script>