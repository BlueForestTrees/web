<template>
    <v-layout column>

        <v-layout column align-center>
            <v-text-field autofocus v-model="term" clearable class="not-too-large"/>
        </v-layout>

        <v-divider/>

        <selectable-list :items="items" no-qt selection-key="impactEntryPicker" :maxSelectionSize="1" @select="item => $emit('select',item)"/>

    </v-layout>

</template>
<script>
    import SelectableList from "../common/SelectableList"
    import {name} from "../../services/calculations"
    import {GO} from "../../const/go"

    export default {
        name: "entry-list",
        props: {action: {type: String}},
        components: {SelectableList},
        data: function () {
            return {
                GO,
                items: null,
                detailsDialog: false,
                term: null
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
            query() {
                return ({
                    term: this.term || undefined
                })
            }
        },
        methods: {
            name,
            async refresh() {
                this.items = await this.$store.dispatch(this.action, this.query)
            }
        }
    }
</script>