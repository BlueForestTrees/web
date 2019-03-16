<template>
    <v-layout column>

        <v-layout column align-center>
            <v-text-field label="Filtrer par nom" autofocus :value="term" @input="setTerm" clearable class="not-too-half"/>
        </v-layout>

        <v-divider/>

        <selectable-list :items="items" no-qt selection-key="impactEntryPicker" :maxSelectionSize="1" @select="item => $emit('select',item)"/>

    </v-layout>

</template>
<script>
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"
    import Do from "../../const/do"
    import {GO} from "../../const/go"

    export default {
        name: "impact-entry-picker",
        components: {SelectableList},
        data: function () {
            return {
                GO,
                items: null,
                detailsDialog: false
            }
        },
        created() {
            this.refresh()
        },
        watch: {
            query() {
                this.refresh()
            }
        },
        computed: {
            ...mapState({
                term: s => s.nav.tree.impact.term
            }),
            query() {
                return ({
                    term: this.term || undefined
                })
            }
        },
        methods: {
            name,
            async refresh() {
                this.items = await this.dispatchSearch(this.query)
            },
            ...mapActions({
                dispatchSearch: On.SEARCH_IMPACT_ENTRY,
            }),
            ...mapMutations({
                setTerm: Do.SET_TREE_IMPACT_TERM
            }),
        }
    }
</script>