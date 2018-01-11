<template>
    <main-dialog :dialog="Dial.COMPARE_TO" @focus="$refs.lookup.focus()" @esc="close" ref="dialog">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Comparer à ...
            </v-card-title>
            <v-card-text>
                <lookup ref="lookup" @select="openOtherTree"/>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="close">Annuler</v-btn>
            </v-card-actions>
        </v-card>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import Lookup from "../common/Lookup";
    import {mapActions} from 'vuex';
    import {Dial} from "../../const/dial";
    import {On} from "../../const/on";

    export default {
        components: {Lookup, MainDialog},
        data() {
            return {
                Dial: Dial
            }
        },
        methods: {
            ...mapActions({
                dispatchOpenCompareTo: On.OPEN_COMPARE_TO
            }),
            openOtherTree(otherTree) {
                this.dispatchOpenCompareTo(otherTree);
                this.close();
            },
            close(){
                this.$refs.dialog.close();
            }
        }
    }
</script>