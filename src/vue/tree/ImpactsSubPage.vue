<template>
    <v-layout column align-center mb-1>

        <transition-expand>
            <div v-if="adding">
                <subpage-title title="Ajouter un impact" sub color="white">
                    <closer v-if="adding" slot="right" @close="setAdding(false)"/>
                </subpage-title>

                <impact-adder :tree="tree" @close="setAdding(false)"/>
            </div>
        </transition-expand>

        <fragment-list v-if="!adding" :tree="tree" :fragment="IMPACT_TANK" :selectionKey="selectionKey" />

        <transition name="slide-left-right">
            <v-layout v-if="oneSelected" justify-center>
                <open-message slot="right" :section="section" no-text/>
                <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                <btn icon="delete" iconColor="grey" @click="deleteOneSelected"></btn>
            </v-layout>
        </transition>

        <btn v-if="!adding" icon="add_box" icon-color="grey" @click="setAdding(true)"/>
    </v-layout>
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
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS,
                deleteImpactTank: On.DELETE_IMPACT_TANK,
                snackError: On.SNACKERROR
            }),
            deleteOneSelected() {
                this.deleteImpactTank({tree: this.tree, impactTank: this.oneSelected})
                    .then(this.unselect)
                    .catch(this.snackError)
            },
            setAdding(adding) {
                this.adding = adding
                this.adding && this.unselect()
            }
        }
    }
</script>