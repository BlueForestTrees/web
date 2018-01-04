<template>
    <main-dialog :dialog="Dial.COMPARE_TO" @focus="$refs.lookup.focus()" @validate="" ref="dialog">
        <v-card-title class="grey lighten-4 py-4 title">
            Comparer à ...
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-layout align-center>

                        <lookup :lookup="Loo.COMPARE_TO" ref="lookup" @select="openOtherTree"/>

                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </main-dialog>
</template>

<script>
    import {Loo} from "../../const/loo";
    import MainDialog from "./MainDialog";
    import Lookup from "../common/Lookup";
    import {mapActions} from 'vuex';
    import {Dial} from "../../const/dial";
    import {On} from "../../const/on";

    export default {
        components: {Lookup, MainDialog},
        name: 'compare-to-dialog',
        data() {
            return {
                Dial: Dial,
                Loo: Loo
            }
        },
        methods: {
            ...mapActions({
                dispatchOpenCompareTo : On.OPEN_COMPARE_TO
            }),
            openOtherTree(otherTree) {
                this.dispatchOpenCompareTo(otherTree);
                this.$refs.dialog.visible = false;
            }
        }
    }
</script>