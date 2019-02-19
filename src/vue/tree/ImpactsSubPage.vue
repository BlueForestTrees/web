<template>
    <impact-adder v-if="modeAdd" :tree="tree" @close="$emit('close')"/>
    <v-card v-else>
        <subpage-title title="Environnement" icon-class="planet logo"/>

        <transition name="slide-fade" mode="out-in">
            <fragment-list v-if="idx === 0" :tree="tree" :fragment="IMPACT_TANK" none="Pas encore d'informations sur les impacts sur l'environnement" key="0"></fragment-list>
            <fragment-list v-else-if="idx === 1" :tree="tree" :fragment="IMPACTS" none="Pas encore d'informations sur les impacts sur l'environnement" key="1"
                note="Note: Vous êtes en train de regarder les impacts déclarés au niveau du produit sans compter ceux de ces ressources."
            ></fragment-list>
        </transition>

        <v-divider/>
        <v-layout>
            <v-spacer/>
            <scope-menu :value="idx" @input="setIdx" :dense="$vuetify.breakpoint.xsOnly" :scope="impactScope"/>
            <open-message :section="section" no-text/>
        </v-layout>
    </v-card>
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

    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "impacts-subpage",
        data: () => ({
            loading: false,
            impactScope, IMPACTS, IMPACT_TANK
        }),
        components: {
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
            }
        }
    }
</script>