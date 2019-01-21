<template>
    <router-link :to="{name:GO.TREE, params:{_id:selection.trunkId, bqt:selection.quantity.bqt}}">
        <div class="font-weight-thin display-1">{{qtUnitName(selection)}}</div>
    </router-link>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"
    import {GO} from "../../const/go"

    export default {
        name: "selection-link",
        props: ['selection'],
        data: () => ({GO}),
        methods: {
            qtUnitName
        }
    }
</script>