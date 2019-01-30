<template>
    <impact-adder v-if="modeAdd" :tree="tree" @close="$emit('close')"/>
    <v-card v-else>
        <v-layout row>
            <div class="ma-3 display-1 font-weight-thin">Impacts sur l'environnement</div>
            <v-spacer></v-spacer>
            <scope-menu v-model="idx" :dense="$vuetify.breakpoint.xsOnly" :scope="impactScope"/>
        </v-layout>

        <transition name="slide-fade" mode="out-in">
            <fragment-list v-if="idx === 0" :tree="tree" :selection="selection" :fragment="IMPACTS" none="Pas encore d'informations sur les impacts" key="0"></fragment-list>
            <fragment-list v-else-if="idx === 1" :tree="tree" :selection="selection" :fragment="IMPACT_TANK" none="Pas encore d'informations sur les impacts globaux" key="1"></fragment-list>
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
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import ScopeMenu from "../root/ScopeMenu"
    import {impactScope} from "../../const/img"

    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "impacts-subpage",
        data: () => ({
            idx: 0,
            loading: false,
            impactScope, IMPACTS, IMPACT_TANK
        }),
        components: {
            FragmentList,
            ScopeMenu,
            Loader,
            ImpactAdder,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection', 'modeAdd'],
        computed: {
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
            ...mapActions({updateTree: On.UPDATE_TREE}),
            refresh: async function () {
                this.loading = true
                this.updateTree({tree: this.tree, fragments: [IMPACT_TANK]})
                this.loading = false
            }
        }
    }
</script>