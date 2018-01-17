<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>
        <v-list two-line style="height: 300px">

        </v-list>
    </v-card>

    <!--<div>Composants de {{seed.name}}:</div>-->
    <!--<span>{{seed.qt}} {{seed.name}} = </span>-->
    <!--<list :trunks="seed.roots" v-on:selectQt="" v-on:select="onRootClick" :qt="true"-->
    <!--:sep="'+'"></list>-->
    <!--<span v-if="seed.roots.length > 0"> + </span>-->
    <!--<span @click="onUpdateAddingSeedClick(true)">...</span>-->

    <!--<search-box v-if="addingSeed" :search="search" v-on:select="onCreateSeed"-->
    <!--v-on:create="onCreateTrunkThenSeed"></search-box>-->

    <!--<qt-unit-setter v-if="linkEdit" :trunk="linkEdit.trunk" :root="linkEdit.root" v-on:setQtUnit="onLinkChanged" v-on:close="onClearLinkEdit"></qt-unit-setter>-->

</template>

<script>
    export default {}
</script>