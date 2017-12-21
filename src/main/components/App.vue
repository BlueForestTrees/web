<template>
    <div id="app">

        <div id="trunk" v-if="trunk">
            <button @click="onTrunkClose">X</button>
            <trunk-path :path="path" v-on:select="onPathClick" v-on:select-link="onPathLinkClick"></trunk-path>
            <qt-unit-setter v-if="linkEdit" :trunk="linkEdit.trunk" :root="linkEdit.root" v-on:setQtUnit="onSetQtUnit"></qt-unit-setter>
            <trunk-list :trunks="seed.roots" v-on:select="onRootClick" :qt="true"></trunk-list>
            <search-box v-if="!linkEdit" :search="search" v-on:select="onCreateSeed" v-on:create="onCreateTrunkThenSeed"></search-box>
        </div>

        <div id="search" v-if="!trunk">

            <search-box :search="search" v-on:select="onOpenTree" v-on:create="onCreateAndOpenTree"></search-box>

        </div>

    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import * as On from "../store/actionKeys";
    import TrunkList from './common/TrunkList';
    import TrunkPath from './common/TrunkPath';
    import SearchBox from "./search/SearchBox";
    import QtUnitSetter from "./props/QtUnitSetter";

    export default {
        name: 'app',
        components: {
            SearchBox, TrunkList, TrunkPath, QtUnitSetter
        },
        computed: {
            ...mapGetters(['trunk', 'seed']),
            ...mapState(
                ['path','search', 'linkEdit']
            )
        },
        methods: {
            ...mapActions([On.TRUNK_CLOSE, On.PATH_CLICK, On.PATH_LINK_CLICK, On.SET_QT_UNIT, On.ROOT_CLICK, On.CREATE_SEED, On.CREATE_TRUNK_THEN_SEED, On.CREATE_AND_OPEN_TREE, On.OPEN_TREE])
        }
    }
</script>

<style>
    #app, input {
        font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 1.5em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
