<template>
    <div>
        <v-card class="ma-2 elevation-5">
            <subpage-title title="Impacts sur l'environnement" sub color="whitegrey">
                <closer v-if="adding" slot="right" @close="setAdding(false)"/>
                <btn v-else slot="right" icon="add_box" icon-color="grey" @click="setAdding(true)"/>
            </subpage-title>

            <transition-expand>
                <div v-if="adding">
                    <subpage-title centered title="Ajouter un impact" sub icon-class="planet logo"/>
                    <impact-adder :tree="tree" @close="setAdding(false)"/>
                </div>
            </transition-expand>

            <fragment-list v-if="!adding" :tree="tree" :fragment="IMPACT_TANK" :selectionKey="selectionKey" forced/>
        </v-card>

        <transition-expand>
            <v-card class="ma-2 elevation-5" v-if="oneSelected">
                <subpage-title :title="qtUnitName(oneSelected)" sub color="whitegrey"/>
                <v-layout justify-center>
                    <open-message slot="right" :section="section" no-text/>
                    <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                    <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                    <btn icon="delete" iconColor="grey" @click="deleteOneSelected"></btn>
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
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import ScopeMenu from "../root/ScopeMenu"
    import {impactScope} from "../../const/img"
    import SubpageTitle from "./SubpageTitle"
    import {name, qtUnitName} from "../../services/calculations"
    import Closer from "../common/Closer"
    import selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"
    import {impact} from "../../const/selections"
    import Note from "../common/Note"

    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "impacts-subpage",
        mixins: [selectable],
        data: () => ({
            adding: false,
            loading: false,
            impactScope, IMPACTS, IMPACT_TANK,
            selectionKey: impact
        }),
        components: {
            Note,
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
            items() {
                return this.tree && this.tree.impactsTank
            },
            section() {
                return {
                    title: `Discussion sur les impacts de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'impact.trunk',
                        topicId: this.tree._id,
                        subTopicId: this.oneSelected.impactId
                    }
                }
            }
        },
        methods: {
            qtUnitName,
            ...mapActions({
                loadTreeFragment: On.UPDATE_TREE,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS,
                deleteImpactTank: On.DELETE_IMPACT_TANK
            }),
            deleteOneSelected() {
                this.deleteImpactTank({tree: this.tree, impactTank: this.oneSelected})
                    .then(this.unselect)
            },
            setAdding(adding) {
                this.adding = adding
                this.adding && this.unselect()
            }
        }
    }
</script>