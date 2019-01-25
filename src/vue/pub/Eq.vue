<template>
    <v-container>
        <v-card>
            <v-layout class="top-left" row>
                <v-btn color="primary" flat icon @click="gotoEq(info)">
                    <v-icon>edit</v-icon>
                </v-btn>
                <open-message dense :section="{title: `Discuter sur ${info.path}`, description:info.description, filter: {topicId:info._id, type: `eq.info`}}"/>
            </v-layout>
            <v-layout column align-center>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center my-5>
                    <selection-card-front v-if="info && info.leftSelection" :selection="info.leftSelection" :attribute="leftAttribute"/>
                    <div class="bold-font align display-2 ma-4">=</div>
                    <selection-card-front v-if="info && info.rightSelection" :selection="info.rightSelection" :attribute="rightAttribute"/>
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
        name: "eq-show",
        components: {OpenMessage, SelectionCardFront, SelectionLink},
        props: ['info'],
        data: () => ({
            GO,
            leftTree: null, rightTree: null
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
                    } catch (e) {
                        console.error(e)
                    }
                }
            },
            refreshTree(selection, fragment) {
                return this.loadSelectionTree({selection, fragments: [fragment.type]})
            },
            gotoEq(info) {
                this.$router.push({name: GO.EDIT_EQUIV, params: {path: info.path}})
            }
        },
        computed: {
            leftAttribute() {
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            coef() {
                return this.leftAttribute
                    && this.rightAttribute
                    && this.info.fragment
                    && attributeCoef(this.leftAttribute, this.rightAttribute, this.info.fragment)
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