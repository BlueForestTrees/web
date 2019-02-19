<template>
    <v-container>
        <v-card>
            <v-layout class="top-left" row>
                <v-btn color="primary" flat icon @click="gotoAlt(info)">
                    <v-icon>edit</v-icon>
                </v-btn>
                <open-message no-text :section="{title: `Discuter sur ${info.path}`, description:info.description, filter: {topicId:info._id, type: `alt.info`}}"/>
            </v-layout>
            <v-layout column align-center>
                <v-layout column align-center justify-center my-5>
                    <div class="font-weight-thin text-no-wrap display-1">Choisir</div>
                    <selection-card-front v-if="info && info.leftSelection" :selection="info.leftSelection" :attribute="leftAttribute"/>
                    <div class="font-weight-thin text-no-wrap display-1 mt-5">au lieu de</div>
                    <selection-card-front v-if="info && info.rightSelection" :selection="info.rightSelection" :attribute="rightAttribute"/>
                    <div class="font-weight-thin text-no-wrap display-1 mt-5">c'est éviter l'équivalent de</div>
                    <selection-card-front v-if="info && info.equivSelection" :selection="info.equivSelection" :attribute="equivAttribute"/>
                </v-layout>
            </v-layout>
            <div class="bottom-right pa-2 font-weight-medium font-italic">{{info.path}}</div>
        </v-card>
    </v-container>
</template>

<script>
    import {attributeCoef, getAttributeByFragment, qtUnitName} from "../../services/calculations"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"
    import SelectionLink from "./Selection-Link"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import On from "../../const/on"
    import OpenMessage from "../common/OpenMessage"

    export default {
        name: "alt-show",
        components: {OpenMessage, SelectionCardFront, SelectionLink},
        props: ['info'],
        data: () => ({
            GO,
            leftTree: null, rightTree: null, equivTree: null
        }),
        mounted() {
            this.refresh()
        },
        methods: {
            qtUnitName,
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoefAll: On.APPLY_QUANTITY_COEF_ALL
            }),
            async refresh() {
                if (this.info) {
                    try {
                        this.leftTree = await this.refreshTree(this.info.leftSelection, this.info.fragment)
                        this.rightTree = await this.refreshTree(this.info.rightSelection, this.info.fragment)
                        this.equivTree = await this.refreshTree(this.info.equivSelection, this.info.fragment)
                    } catch (e) {
                        console.error(e)
                    }
                }
            },
            refreshTree(selection, fragment) {
                return this.loadSelectionTree({selection, fragments: [fragment.type]})
            },
            gotoAlt(info) {
                this.$router.push({name: GO.EDIT_ALT, params: {path: info.path}})
            }
        },
        computed: {
            leftAttribute() {
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            equivAttribute() {
                return this.equivTree && this.info.fragment && getAttributeByFragment(this.equivTree, this.info.fragment)
            },
            deltaAttribute() {
                if (this.leftAttribute && this.rightAttribute) {
                    const deltaBqt = this.rightAttribute.quantity.bqt - this.leftAttribute.quantity.bqt
                    const delta = JSON.parse(JSON.stringify(this.rightAttribute))
                    delta.quantity.bqt = deltaBqt
                    return delta
                }
            },
            coef() {
                if (this.deltaAttribute && this.equivAttribute) {
                    return this.deltaAttribute.quantity.bqt / this.equivAttribute.quantity.bqt
                }
            }
        },
        watch: {
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoefAll({tree: this.rightTree, coef: c})
                }
            }
        }
    }
</script>