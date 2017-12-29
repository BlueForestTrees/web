<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>


                <!--<div id="trunk" v-if="trunk">-->
                    <!--<div>-->
                        <!--<span>Ouvert: </span>-->
                        <!--<trunk-path :path="path" v-on:select="onPathClick"-->
                                    <!--v-on:select-link="onPathLinkClick"></trunk-path>-->
                        <!--<span @click="onTrunkClose">Fermer</span>-->
                    <!--</div>-->
                    <!--<span>-->
                            <!--<div>Caractéristiques de {{seed.name}}:</div>-->
                            <!--<list :trunks="seed.facets" :qt="true"></list>-->
                        <!--</span>-->
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
                    <!--&lt;!&ndash;<qt-unit-setter v-if="linkEdit" :trunk="linkEdit.trunk" :root="linkEdit.root" v-on:setQtUnit="onLinkChanged" v-on:close="onClearLinkEdit"></qt-unit-setter>&ndash;&gt;-->
                <!--</div>-->

                <!--<div id="search" v-if="!trunk">-->

                    <!--<search-box :search="search" v-on:select="onOpenTree"-->
                                <!--v-on:create="onCreateAndOpenTree"></search-box>-->

                <!--</div>-->

            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex';
    import List from "./common/List";

    export default{
        components: {List},
        name:'main-content',
        computed: {
            ...mapGetters(['searchOccur', 'hasResults']),
            ...mapState(['search'])
        },
        methods: {
            ...mapActions([])
        }
    }
</script>