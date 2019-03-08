<template>
    <g :class="root ? 'node root' : 'node trunk'" @click="$emit('click', tree)"
       :transform="`translate(${x} ${y})`"
    >

        <foreignObject x="-110" :y="size+5" width="220" height="80"><div class="text align noselect">{{qtUnitName(tree)}}</div></foreignObject>

        <transition name="size"><circle v-if="selected" class="selection" :r="size+5"></circle></transition>

        <circle class="pin" :r="size" :cx="0" :cy="0"></circle>

    </g>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: "trunk",
        props: {
            tree: Object,
            x: Number, y: Number, size: {type: Number, default: 30},
            root: {type: Boolean, default: false},
            selected: {type: Boolean, default: false}
        },
        methods: {
            qtUnitName
        }

    }
</script>