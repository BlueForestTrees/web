<template>

    <span>
        <v-layout row wrap v-if="grandeur">
            <v-chip v-for="unit in grandeur" :key="unit.shortname" v-if="unitMatch(unit, filter)"
                    @click="select(unit)"
                    fab dark small color="primary" text-color="white">
                {{unit.shortname || "pas d'unité"}}
            </v-chip>
        </v-layout>
        <v-layout v-else row wrap>
            <span v-for="(units,name) in stateGrandeurs" :key="name" v-if="unitsMatch(units, filter)">
                <v-subheader>{{name}}</v-subheader>
                <v-layout row wrap>
                <v-chip v-for="unit in units" :key="unit.shortname" v-if="unitMatch(unit, filter)"
                        @click="select(unit)"
                        fab dark small color="primary" text-color="white">
                {{unit.shortname || "pas d'unité"}}
                </v-chip>
                </v-layout>
            </span>
        </v-layout>
    </span>


</template>

<script>

    import {mapState} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        props: {
            filter: {}, unit: {},
            samegrandeur: {
                type: Boolean
            }
        },
        computed: {
            grandeur: function () {
                if (this.unit && this.samegrandeur) {
                    return this.unitGrandeur(this.unit);
                }
            },
            ...mapGetters({unitGrandeur: 'grandeurOfUnitShortname'}),
            ...mapState({stateGrandeurs: 'grandeurs'})
        },
        methods: {
            unitsMatch(units, filter) {
                return _.find(units, unit => this.unitMatch(unit, filter))
            },
            unitMatch(unit, filter) {
                if (_.isNil(filter)) {
                    return true;
                } else if (_.isEmpty(filter)) {
                    return unit.shortname === "";
                } else {
                    return unit.shortname.toLowerCase().indexOf(filter.toLowerCase()) > -1;
                }
            },
            select(unit) {
                this.$emit('select', unit);
            }
        }
    }
</script>