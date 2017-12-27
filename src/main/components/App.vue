<template>
    <div id="app">

        <div id="trunk" v-if="trunk">
            <div>
                <span>Ouvert: </span>
                <trunk-path :path="path" v-on:select="onPathClick" v-on:select-link="onPathLinkClick"></trunk-path>
                <span @click="onTrunkClose">Fermer</span>
            </div>
            <span>
                <div>Caractéristiques de {{seed.name}}:</div>
                <trunk-list :trunks="seed.facets" :qt="true"></trunk-list>
            </span>
            <span>
                <div>Composants de {{seed.name}}:</div>
                <span>{{seed.qt}} {{seed.name}} = </span>
                <trunk-list :trunks="seed.roots" v-on:select="onRootClick" :qt="true" :sep="'+'"></trunk-list>
                <span v-if="seed.roots.length > 0"> + </span>
                <span @click="onUpdateAddingSeedClick(true)">...</span>
            </span>
            <span>
                <div>Tank de {{trunk.name}}:</div>
                <trunk-list :trunks="tank" :qt="true" :sep="'+'"></trunk-list>
            </span>

            <search-box v-if="addingSeed" :search="search" v-on:select="onCreateSeed" v-on:create="onCreateTrunkThenSeed"></search-box>
            <!--<qt-unit-setter v-if="linkEdit" :trunk="linkEdit.trunk" :root="linkEdit.root" v-on:setQtUnit="onLinkChanged" v-on:close="onClearLinkEdit"></qt-unit-setter>-->
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
    import * as To from "../services/mapper";

    export default {
        name: 'app',
        components: {
            SearchBox, TrunkList, TrunkPath, QtUnitSetter
        },
        computed: {
            tank : function(){
                return To.tank(this.trunk)
            },
            ...mapGetters(['trunk', 'seed']),
            ...mapState(
                ['path','search', 'linkEdit', 'addingSeed']
            )
        },
        methods: {
            ...mapActions([On.UPDATE_ADDING_SEED_CLICK, On.TRUNK_CLOSE, On.PATH_CLICK,On.CLEAR_LINK_EDIT, On.PATH_LINK_CLICK, On.LINK_CHANGED, On.ROOT_CLICK, On.CREATE_SEED, On.CREATE_TRUNK_THEN_SEED, On.CREATE_AND_OPEN_TREE, On.OPEN_TREE])
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
