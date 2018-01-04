<template>
    <main-dialog :dialog="Dial.TRUNK" @focus="$refs.nameInput.focus()" @validate="validate" ref="dialog">
        <template slot-scope="props">
            <v-card-title class="grey lighten-4 py-4 title">
                Créer une ressource
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon>bookmark</v-icon>
                            </v-avatar>
                            <v-text-field ref="nameInput" placeholder="Nom" :value="props.data.name" @input="updateName"/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {On} from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
        name: 'trunk-dialog',
        data() {
            return {
                Dial: Dial
            }
        },
        components: {MainDialog},
        props: ['data'],
        methods: {
            ...mapActions({"validate": On.CREATE_AND_OPEN_TREE}),
            updateName:function(value) {
                this.$refs.dialog.data = {name:value};
            }
        }
    }
</script>