<template>
    <span>
        <span v-for="(trunk, i) in trunks" :key="trunk._id" @click="$emit('select',trunk)">
            <span v-if="qt && trunk.qt">{{trunk.qt}} </span>
            <span>{{trunk.name}}</span>
            <span v-if="i !== trunks.length - 1">{{separator}}</span>
        </span>
    </span>
</template>

<script>

    export default {
        name: "trunk-list",
        props: ['trunks', 'qt', 'sep'],
        computed:{
            separator: function(){
                return this.sep || ",";
            }
        }
    }

</script>