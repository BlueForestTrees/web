<template>
    <v-layout column>

        <v-container pt-0>
            <v-text-field autofocus v-model="term" clearable placeholder="Recherche"></v-text-field>
        </v-container>

        <v-list scoped-slot="{items}" dense>
            <template v-for="(item,i) in items">
                <slot :item="item">
                    <v-list-tile :key="item._id" @click="$emit('select',item)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ name(item) }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </slot>
                <v-divider v-if="i+1 < items.length"/>
            </template>
        </v-list>

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