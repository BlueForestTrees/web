<template>
    <v-layout row wrap justify-center align-center id="ressource_stack">
        <template v-for="(item,i) in _path">
            <v-flex v-if="up">
                <v-icon large>keyboard_arrow_up</v-icon>
            </v-flex>
            <v-flex>
                <item :item="item" :selectable="ordered(i)>0" :forceSelect="ordered(i) === _path.length-1"
                      @configure="configure" @delete="$emit('delete')" @select="select(item,ordered(i))"
                      @load="load(item, ordered(i))"
                />
            </v-flex>
            <v-flex v-if="down">
                <v-icon large>keyboard_arrow_up</v-icon>
            </v-flex>
        </template>
    </v-layout>
</template>

<script>
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import Item from "./Item";


    export default {
        components: {Item},
        name: 'item-path',
        props: {
            path: Array,
            up: Boolean
        },
        computed: {
            down: function () {
                return !this.up;
            },
            _path: function () {
                return this.down ? this.path : this.path.slice().reverse();
            }
        },
        methods: {
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            configure() {
                this.showDialog({dialog: Dial.CONFIGURE_ROOT});
            },
            ordered(i) {
                return this.down ? i : this.path.length - i - 1;
            },
            select(item, i) {
                this.$emit('select', i, item);
            },
            load(item, i) {
                this.$emit('load', i, item);
            }
        }
    }
</script>

<style>
    #ressource_stack {
        flex-direction: column;
    }
</style>