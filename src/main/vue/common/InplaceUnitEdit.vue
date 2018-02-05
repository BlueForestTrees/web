<template>
    <v-menu v-model="editing">
        <span @click="edit" slot="activator">{{initial || '?'}}</span>
        <v-card>
            <v-card-text>
                <unit-grid :unit="initial" samegrandeur @select="ok"/>
            </v-card-text>
        </v-card>
    </v-menu>
</template>


<script>
    import UnitGrid from "./UnitGrid";

    export default {
        components: {UnitGrid},
        name: 'inplace-unit-edit',
        props: ['initial'],
        data: function () {
            return {
                editing: false
            }
        },
        methods: {
            edit: function () {
                this.editing = true;
            },
            ok: function (unit) {
                this.editing = false;
                this.$emit("ok", unit);
            },
            close: function () {
                this.editing = false;
                this.$emit("ko");
            }
        }
    }
</script>


<style>

</style>