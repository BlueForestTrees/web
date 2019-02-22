<template>
    <div style="width: 320px; height:27em" class="ma-3 pa-3">

        <transition name="slide-fade" mode="out-in">
            <v-layout v-if="tree && tree.trunk && fragment" column align-center justify-center style="height:80%">
                <qt-unit-name v-if="tree" :tree="tree"></qt-unit-name>
                <photo :trunk="tree.trunk" size="200"/>
            </v-layout>
            <loader v-else style="position:relative;top:8em"/>
        </transition>

        <v-layout v-if="tree && tree.trunk && fragment" align-center column>
            <span style="position:absolute;bottom:1em">
                <h3 v-if="showFragment">{{name(fragment)}}: {{qtUnit(fragment)}}</h3>
                <h3 v-else>{{name(fragment)}}: ???</h3>
                <v-btn color="primary" small :disabled="!canAnswer" @click="select" class="mb-2">moi</v-btn>
            </span>
        </v-layout>

    </div>
</template>

<script>
    import Loader from "../loader/Loader"
    import Photo from "../common/Photo"
    import QtUnitName from "../tree/QtUnitName"
    import {qtUnit, name} from "../../services/calculations"

    export default {
        name: "choix-produit",
        props: {tree: Object, showFragment: Boolean, fragment: Object, canAnswer: Boolean},
        components: {QtUnitName, Photo, Loader},
        data: () => ({qtUnit, name}),
        methods: {
            select() {
                this.$emit('select')
            }
        },
    }
</script>