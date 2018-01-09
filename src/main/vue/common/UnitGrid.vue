<template>
    <v-card class="grid" style="padding:1em;">
        <span v-for="(units,name) in grandeurs" :key="name" v-if="filteredGrandeur(filter, units)">
            <v-subheader>{{name}}</v-subheader>
            <v-container fluid grid-list-sm>
            <v-layout row wrap>
                <v-chip v-for="unit in units" :key="unit.shortname" v-if="filteredUnit(filter, unit)"
                        fab dark small @click="select(unit)" color="primary" text-color="white">{{unit.shortname || "pas d'unité"}}</v-chip>
            </v-layout>
            </v-container>
        </span>
    </v-card>
</template>

<script>

    import {mapState} from 'vuex';

    export default {
        props: ['filter'],
        computed: {
            ...mapState(['grandeurs'])
        },
        methods:{
            filteredGrandeur(filter, units){
                return _.find(units,unit=>this.filteredGrandeur(filter,unit))
            },
            filteredGrandeur(filter, unit){
                if(filter === null){
                    return false;
                }else if(filter.length === 0){
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