<template>
    <div>
        <v-card>
            <v-list two-line>
                <draggable :list="info.items" @change="orderChange" :options="{dragClass:'dragClass', chosenClass:'chosenClass'}">
                    <template v-for="(infoId, i) in info.items">
                        <div :key="infoId">
                            <v-list-tile @click="">
                                <v-icon color="primary" class="mr-4">apps</v-icon>
                                <info-id-dense :infoId="infoId"></info-id-dense>
                                <v-btn icon flat color="primary" @click="removeInfo(infoId)">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-list-tile>
                            <v-divider v-if="i+1 < info.items.length"/>
                        </div>
                    </template>
                </draggable>
            </v-list>
        </v-card>

        <v-container>
            <v-card>
                <v-toolbar class="elevation-0" color="primary" dark>
                    <v-toolbar-title class="font-weight-black">Détails du groupe</v-toolbar-title>
                </v-toolbar>

                <v-container>
                    <v-layout column>
                        <v-list>
                            <v-list-tile v-if="!editing || idx === 1" key="1">
                                <v-list-tile-content>
                                    <v-list-tile-title>Nom:<span class="font-weight-medium ml-3">{{info && info.path}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 1">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 2" key="2">
                                <v-list-tile-content>
                                    <v-list-tile-title>Commentaire (optionnel):<span class="font-weight-medium ml-3">{{info && info.description}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 2">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 3" key="3">
                                <v-list-tile-content>
                                    <v-list-tile-title>Informations:<span class="font-weight-medium ml-3">{{info.items.length}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 3">
                                        <v-icon color="primary" large>add</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-layout>
                </v-container>
                <v-window v-model="idx">
                    <v-window-item></v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <path-checker @save="selectPath" :path="info && info.path"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <description-input @save="selectDescription" :value="info && info.description"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <information-picker @select="addInfo"/>
                    </v-window-item>
                </v-window>
            </v-card>
            <info-saver v-if="!editing" v-model="canSave" :info="info"/>
        </v-container>
    </div>
</template>
<script>
    import Card from "../common/Card"
    import InformationPicker from "./InformationPicker"
    import InfoSaver from "./InfoSaver"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import draggable from 'vuedraggable'
    import {GO} from "../../const/go"
    import PathChecker from "./PathChecker"
    import DescriptionInput from "./DescriptionInput"
    import InfoLoader from "./InfoLoader"
    import InfoIdDense from "../home/InfoIdDense"

    export default {
        name: "create-group",
        mixins: [InfoLoader],
        components: {InfoIdDense, DescriptionInput, PathChecker, InfoSaver, InformationPicker, Card, draggable},
        data: () => ({
            GO,
            idx: 0,
            canSave: false,
            info: {type: "gr", path: null, description: null, items: []}
        }),
        methods: {
            ...mapActions({
                snack: On.SNACKBAR,
                getInfo: On.GET_INFO
            }),
            addInfo(info) {
                if (this.info._id === info._id) {
                    this.snack({text: "Impossible d'ajouter un élément en lui même.", color: "orange"})
                } else if (this.info.items.indexOf(info._id) === -1) {
                    this.info.items.push(info._id)
                    this.canSave = true
                } else {
                    this.snack({text: "Cet élement est déjà présent dans le groupe. On ne peux pas ajouter deux fois la même information", color: "orange"})
                }
            },
            removeInfo(infoId) {
                this.info.items.splice(this.info.items.indexOf(infoId), 1)
                this.canSave = true
            },
            orderChange() {
                this.canSave = true
            },
            selectPath(path) {
                this.info.path = path
                this.canSave = true
                this.close()
            },
            selectDescription(description) {
                this.info.description = description
                this.canSave = true
                this.close()
            },
            close() {
                this.idx = 0
            },
            infoChanged(info) {
                this.info = info
            }
        },
        computed: {
            editing() {
                return this.idx !== 0
            }
        }
    }
</script>