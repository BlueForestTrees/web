<template>
    <span v-if="!editing" @click="edit">{{initial}}</span>
    <v-layout v-else row>
        <unit-grid v-if="editing" :grandeurs="grandeurs" @select="ok"/>
    </v-layout>
</template>


<script>
    import UnitGrid from "./UnitGrid";
    import {mapState} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        components: {UnitGrid},
        name: 'inplace-unit-edit',
        props: {
            initial: {
                type: String
            },
            samegrandeur: {
                type: Boolean
            }
        },
        data: function () {
            return {
                editing: false
            }
        },
        computed: {
            ...mapState({stateGrandeurs: 'grandeurs'}),
            grandeurs: function () {
                return this.samegrandeur ? this.grandeur(this.initial) : this.stateGrandeurs;
            }
        },
        methods: {
            ...mapGetters(['grandeur']),
            edit: function () {
                this.editing = true;
            },
            ok: function (unit) {
                this.editing = false;
                this.$emit("ok", unit);
            },
            ko: function () {
                this.editing = false;
                this.$emit("ko");
            }
        }
    }
</script>


<style>

</style>