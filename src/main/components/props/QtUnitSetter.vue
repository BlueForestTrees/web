<template>
    <div>
        <input :value="trunkQt" @input="updateTrunkQt"/> {{trunk.name}} >>> <input :value="rootQt" @input="updateRootQt"/> {{root.name}}
        <button @click="setQtUnit">Ok</button>
    </div>
</template>

<script>
    export default {
        name: "qt-unit-setter",
        props: ['trunk', 'root'],
        data: function () {
            return {trunkQt: this.trunk.qt, rootQt: this.root.qt};
        },
        methods: {
            updateTrunkQt: function (e) {
                this.trunkQt = e.target.value;
            },
            updateRootQt: function (e) {
                this.rootQt = e.target.value;
            },
            setQtUnit: function(){
                this.$emit('setQtUnit', {trunk: this.trunk, root: this.root, trunkQt:this.trunkQt, rootQt:this.rootQt});
            }
        }
    }
</script>