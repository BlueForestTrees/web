<template>
    <v-card style="width: 320px; height:25em" class="ma-3 pa-3">
        <v-flex v-if="tree && tree.trunk && fragment">
            <v-layout column align-center>
                <photo :trunk="tree.trunk" size="200"/>
            </v-layout>
            <qt-unit-name v-if="tree" :tree="tree"></qt-unit-name>
            <v-layout column align-center>
                <h3 v-if="showFragment">({{qtUnitName(fragment)}})</h3>
            </v-layout>

        </v-flex>

        <v-layout v-else column align-center justify-center>
            <loader style="position:relative;top:8em"/>
        </v-layout>
        <v-layout column align-center>
            <v-btn color="primary" small :disabled="!canAnswer" @click="select" class="logo-big" style="position:absolute;bottom: 0; height:2em">moi</v-btn>
        </v-layout>
    </v-card>
</template>

<script>
    import Loader from "../loader/Loader"
    import Photo from "../common/Photo"
    import QtUnitName from "../tree/QtUnitName"
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: "choix-produit",
        props: {tree: Object, showFragment: Boolean, fragment: Object, canAnswer: Boolean},
        components: {QtUnitName, Photo, Loader},
        data: () => ({qtUnitName}),
        methods: {
            select() {
                this.$emit('select')
            }
        },
    }
</script>