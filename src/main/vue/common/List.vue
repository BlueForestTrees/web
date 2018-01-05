<template>
    <span>
        <span v-for="(trunk, i) in trunks" :key="trunk._id">
            <span v-if="qt && trunk.qt"> {{trunk.qt}} </span>
            <span v-if="qt && !trunk.qt" @click="$emit('selectQt')"> ? </span>
            <span @click="$emit('select',trunk)">{{trunk.name}}</span>
            <span v-if="i !== trunks.length - 1">{{separator}}</span>
        </span>
    </span>
</template>

<script>

    export default {
        props: ['trunks', 'qt', 'sep'],
        computed:{
            separator: function(){
                return this.sep || ",";
            }
        }
    }

</script>