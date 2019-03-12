<template>
    <div>

        <v-card class="ma-2">
            <subpage-title title="Impacts sur l'environnement" sub color="whitegrey">
                <open-message slot="right" :section="section" no-text/>
            </subpage-title>
            <v-layout justify-center>
                <scope-menu :value="idx" @input="setIdx" :dense="$vuetify.breakpoint.xsOnly" :scope="impactScope"/>
            </v-layout>
        </v-card>

        <transition-expand>
            <v-card class="ma-2" v-if="adding">
                <impact-adder :tree="tree" @close="setAdding(false)"/>
            </v-card>
        </transition-expand>

        <v-card class="ma-2">
            <transition name="slide-fade" mode="out-in">
                <fragment-list v-if="idx === 0" :tree="tree" :fragment="IMPACT_TANK" none="Pas encore d'informations" note="Liste des impacts (tout)"></fragment-list>
                <fragment-list v-else-if="idx === 1" :tree="tree" :fragment="IMPACTS" none="Pas encore d'informations" note="Liste des impact (selection)">
                    <v-btn icon><v-list-tile-avatar class="planet-add logo" @click="setAdding(true)"></v-list-tile-avatar></v-btn>
                </fragment-list>
            </transition>
        </v-card>

        <transition-expand>
            <v-card class="ma-2" v-if="oneSelected && idx === 1">
                <subpage-title title="Actions" sub color="whitegrey">
                </subpage-title>
                <v-layout justify-center>
                    <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                    <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                    <btn icon="delete" iconColor="grey"></btn>
                </v-layout>
            </v-card>
        </transition-expand>

    </div>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import OpenMessage from "../common/OpenMessage"
    import ImpactAdder from "../impact/ImpactAdder"
    import {IMPACT_TANK, IMPACTS} from "../../const/fragments"
    import On from "../../const/on"
    import {mapActions, mapMutations, mapState} from "vuex"
    import Loader from "../loader/Loader"
    import ScopeMenu from "../root/ScopeMenu"
    import {impactScope} from "../../const/img"
    import Do from "../../const/do"
    import SubpageTitle from "./SubpageTitle"
    import {name} from "../../services/calculations"
    import Closer from "../common/Closer"
    import selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"

    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "impacts-subpage",
        mixins: [selectable],
        data: () => ({
            adding: false,
            loading: false,
            impactScope, IMPACTS, IMPACT_TANK
        }),
        components: {
            TransitionExpand,
            Btn,
            Closer,
            SubpageTitle,
            FragmentList,
            ScopeMenu,
            Loader,
            ImpactAdder,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'modeAdd'],
        computed: {
            ...mapState({idx: s => s.nav.tree.impact.idx}),
            items() {
                return this.tree && this.tree.impactsTank
            },
            section() {
                return {
                    title: `Discussion sur les impacts de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'impact.trunk',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                loadTreeFragment: On.UPDATE_TREE,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            }),
            ...mapMutations({
                setIdx: Do.SET_TREE_IMPACT_IDX
            }),
            refresh: async function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: [IMPACT_TANK]})
                this.loading = false
            },
            setAdding(adding) {
                this.adding = adding
            }
        }
    }
</script>