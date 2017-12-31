<template>
    <div>
        <h1>{{tree.name}}</h1>
        <h2>Usages</h2>
        <h2>Caractéristiques</h2>
        <h2>Impact</h2>
        <h2>Ressources</h2>
        <h3>Bilan Ressources</h3>
        <!--<div>-->
        <!--<span>Ouvert: </span>-->
        <!--<trunk-path :path="path" v-on:select="onPathClick"-->
        <!--v-on:select-link="onPathLinkClick"></trunk-path>-->
        <!--<span @click="onTrunkClose">Fermer</span>-->
        <!--</div>-->
        <!--<list :trunks="seed.facets" :qt="true"></list>-->
        <!--<span>-->
        <!--<div>Composants de {{seed.name}}:</div>-->
        <!--<span>{{seed.qt}} {{seed.name}} = </span>-->
        <!--<list :trunks="seed.roots" v-on:selectQt="" v-on:select="onRootClick" :qt="true"-->
        <!--:sep="'+'"></list>-->
        <!--<span v-if="seed.roots.length > 0"> + </span>-->
        <!--<span @click="onUpdateAddingSeedClick(true)">...</span>-->
        <!--</span>-->
        <!--<span>-->
        <!--<div>Tank de {{trunk.name}}:</div>-->
        <!--<list :trunks="tank" :qt="true" :sep="'+'"></list>-->
        <!--</span>-->

        <!--<search-box v-if="addingSeed" :search="search" v-on:select="onCreateSeed"-->
        <!--v-on:create="onCreateTrunkThenSeed"></search-box>-->
        <!--<qt-unit-setter v-if="linkEdit" :trunk="linkEdit.trunk" :root="linkEdit.root" v-on:setQtUnit="onLinkChanged" v-on:close="onClearLinkEdit"></qt-unit-setter>-->
    </div>

</template>

<script>
    import {mapState, mapActions} from 'vuex';


    export default {
        name: 'tree',
        props:['tree'],
        computed: {
            ...mapState(['search'])
        },
        methods: {
            ...mapActions([])
        }
    }
</script>