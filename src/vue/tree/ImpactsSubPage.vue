<template>
    <div>
        <v-card class="mb-5">
            <subpage-title title="Environnement" icon-class="planet logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>

            <transition name="slide-fade" mode="out-in">
                <fragment-list v-if="idx === 0" :tree="tree" :fragment="IMPACT_TANK" none="Pas encore d'informations sur les impacts sur l'environnement" key="0"></fragment-list>
                <fragment-list v-else-if="idx === 1" :tree="tree" :fragment="IMPACTS" none="Pas encore d'informations sur les impacts sur l'environnement" key="1" note="Note: Les impacts provoqués par les ressources ne figurent pas ici."></fragment-list>
            </transition>

            <v-divider/>
            <v-layout justify-center>
                <scope-menu :value="idx" @input="setIdx" :dense="$vuetify.breakpoint.xsOnly" :scope="impactScope"/>
                <open-message :section="section" no-text/>
                <v-btn icon><v-list-tile-avatar class="planet-add logo-moyen" @click="setAdding(true)"></v-list-tile-avatar></v-btn>
            </v-layout>
        </v-card>
        <div id="adder">
            <impact-adder v-if="adding" :tree="tree" @close="setAdding(false)"/>
        </div>
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
    import {scrollSubPage, scrollTo} from "../../const/ux"

    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "impacts-subpage",
        data: () => ({
            adding: false,
            loading: false,
            impactScope, IMPACTS, IMPACT_TANK
        }),
        components: {
            Closer,
            SubpageTitle,
            FragmentList,
            ScopeMenu,
            Loader,
            ImpactAdder,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection', 'modeAdd'],
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
                updateTree: On.UPDATE_TREE,
            }),
            ...mapMutations({
                setIdx: Do.SET_TREE_IMPACT_IDX
            }),
            refresh: async function () {
                this.loading = true
                this.updateTree({tree: this.tree, fragments: [IMPACT_TANK]})
                this.loading = false
            },
            setAdding(adding) {
                this.adding = adding
                if (adding) {
                    this.$nextTick(() => scrollTo("#adder"))
                } else {
                    scrollSubPage()
                }
            }
        }
    }
</script>