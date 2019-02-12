<template>
    <div v-if="tree">
        <h1 class="headline align font-weight-black">{{qtUnit}}</h1>
        <h5 v-if="qtFreq" class="align font-weight-thin">{{qtFreq}}</h5>
        <h3 class="subtitle align font-weight-medium">{{name}}</h3>
    </div>
</template>

<script>
    import {qtUnit, name, qtFreq} from "../../services/calculations"

    export default {
        name: "qt-unit-name",
        props: {
            tree: Object, editable: Boolean
        },
        computed: {
            qtUnit() {
                return qtUnit(this.tree)
            },
            qtFreq() {
                return qtFreq(this.tree.selection)
            },
            name() {
                return name(this.tree)
            }
        },
        methods: {
            click() {
                if (this.editable) {
                    this.$emit('click')
                }
            }
        },
    }
</script>