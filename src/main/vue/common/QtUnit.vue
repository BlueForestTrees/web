<template>
    <span>{{value}}</span>
</template>

<script>

    import {qtUnit} from "../../services/calculations";

    export default {
        name: "qt-unit",
        props: ['quantity'],
        computed: {
            value: function () {
                return qtUnit(this);
            }
        }
    }
</script>