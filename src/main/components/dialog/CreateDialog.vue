<template>
    <v-dialog v-model="visible" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title" >
                Créer
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon>bookmark</v-icon>
                            </v-avatar>
                            <v-text-field ref="nameInput" placeholder="Nom" :value="data.data.name" @input="changeName"/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Annuler</v-btn>
                <v-btn flat @click="create">Créer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import {Do, On} from "../../store/keys";

    export default {
        name:'create-dialog',
        props: ['data'],
        methods: {
            ...mapActions({'createAndOpen':On.CREATE_AND_OPEN_TREE}),
            ...mapMutations([Do.UPDATE_CREATE_DIALOG, Do.CLOSE_CREATE_DIALOG, Do.UPDATE]),
            cancel : function(){
                this.closeCreateDialog();
            },
            create : function(){
                this.createAndOpen(this.data.data.name);
                this.closeCreateDialog();
            },
            changeName : function(value){
                this.update({data:this.data.data,key:"name",value});
            }
        },
        computed: {
            visible: {
                get: function(){
                    return this.data.visible;
                },
                set: function (value) {
                    this.updateCreateDialog(value);
                }
            }
        },
        watch:{
            visible(visible){
                if(visible) {
                    this.$nextTick(this.$refs.nameInput.focus);
                }
            }
        }
    }
</script>