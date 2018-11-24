<template>
    <div v-if="tree">
        <h1 class="display-2 align">{{qtUnit(tree)}}</h1>
        <h5 v-if="qtSelection" class="align font-weight-thin">{{qtUnit(qtSelection.quantity)}} / {{qtUnit(qtSelection.freq,{hideOne:true})}}</h5>
        <h3 class="display-1 align font-weight-thin">{{name(tree)}}</h3>
    </div>
</template>

<script>
    import {qtUnit, name} from "../../services/calculations"

    export default {
        name: "tree-card-front",
        props: {
            tree: Object,
            miniPhoto: {type: Boolean, default: false}
        },
        methods: {
            qtUnit, name
        },
        computed: {
            qtSelection: function () {
                return this.tree && this.tree.selection
            }
        }
    }
</script>