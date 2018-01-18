<template>
    <v-card class="grid" style="padding:1em;">
        <span v-for="(units,name) in grandeurs" :key="name" v-if="unitsMatch(units, filter)">
            <v-subheader>{{name}}</v-subheader>
            <v-container fluid grid-list-sm>
                <v-layout row wrap>
                    <v-chip v-for="unit in units" :key="unit.shortname" v-if="unitMatch(unit, filter)"
                            fab dark small @click="select(unit)" color="primary" text-color="white">{{unit.shortname || "pas d'unité"}}</v-chip>
                </v-layout>
            </v-container>
        </span>
    </v-card>
</template>

<script>

    export default {
        props: ['filter','grandeurs'],
        methods:{
            unitsMatch(units, filter){
                return _.find(units,unit=>this.unitMatch(unit, filter))
            },
            unitMatch(unit, filter){
                if(_.isNil(filter)){
                    return true;
                }else if(_.isEmpty(filter)){
                    return unit.shortname === "";
                }else {
                    return unit.shortname.toLowerCase().indexOf(filter.toLowerCase()) > -1;
                }
            },
            select(unit){
                this.$emit('select',unit);
            }
        }
    }
</script>