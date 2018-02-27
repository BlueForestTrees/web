<template>
    <v-chip color="primary" text-color="white" @click="select" @blur="unselect">
        <qt-unit-name :item="item.trunk" />
        <v-icon v-if="buttons"
                right color="white"
                @click.stop="$emit('load')">
            search
        </v-icon>
        <v-icon v-if="buttons"
                right color="white"
                @click.stop="$emit('configure')">
            edit
        </v-icon>
        <v-icon v-if="buttons"
                right color="white"
                @click.stop="$emit('delete')">
            delete
        </v-icon>
    </v-chip>
</template>

<script>
    import QtUnitName from "./QtUnitName";

    export default {
        components: {QtUnitName},
        name:'ressource-item',
        props:['item','selectable','forceSelect'],
        data(){
            return {
                selected: false
            }
        },
        computed:{
            buttons:function(){
                return this.selectable && (this.selected || this.forceSelect);
            }
        },
        methods:{
            select:function(){
                this.selected = true;
                this.$emit("select")
            },
            unselect:function(){
                this.selected = false;
            }
        }
    }
</script>