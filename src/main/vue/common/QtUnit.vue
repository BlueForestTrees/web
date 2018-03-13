<template>
    <span>{{qtUnit}}</span>
</template>

<script>
    import {bestQuantity} from "trees-common/dist";

    export default {
        name: "qt-unit",
        props: ['quantity'],
        computed: {
            qtUnit: function () {
                if (this.quantity) {
                    if (this.quantity.qt && this.quantity.unit) {
                        const best = bestQuantity(this.quantity);
                        return `${best.qt} ${best.unit}`;
                    } else {
                        return this.quantity.qt || "qt?" + this.quantity.unit || "unit?";
                    }
                } else {
                    return "qt? unit?";
                }
            }
        }
    }
</script>