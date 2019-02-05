<template>
    <impact-adder v-if="modeAdd" :tree="tree" @close="$emit('close')"/>
    <v-card v-else>
        <subpage-title title="Impacts sur l'environnement">
            <scope-menu :value="idx" @input="setIdx" :dense="$vuetify.breakpoint.xsOnly" :scope="impactScope"/>
        </subpage-title>
        <v-divider/>

        <transition name="slide-fade" mode="out-in">
            <fragment-list v-if="idx === 0" :tree="tree" :fragment="IMPACTS" none="Pas encore d'informations sur les impacts" key="0"></fragment-list>
            <fragment-list v-else-if="idx === 1" :tree="tree" :fragment="IMPACT_TANK" none="Pas encore d'informations sur les impacts globaux" key="1"></fragment-list>
        </transition>

        <open-message :section="section"/>
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
                    title: `Participer`,
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