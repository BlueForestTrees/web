<template>
    <div class="enough-high-small full-width px-2">
        <subpage-title v-if="note" :title="note" sub color="whitegrey">
            <slot name="right" slot="right"></slot>
        </subpage-title>

        <slot name="subbar"></slot>

        <template v-if="!hide">
            <loader v-if="loading"/>
            <v-layout column v-else>
                <v-text-field v-if="rawItems.length > 20" v-model="filter" clearable autofocus placeholder="Filtre" hide-details />
                <selectable-list :items="items" :maxSelectionSize="1" :selectionKey="selectionKey"/>
            </v-layout>
        </template>
    </div>
</template>
<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Note from "../common/Note"
    import SubpageTitle from "./SubpageTitle"
    import Loader from "../loader/Loader"
    import Btn from "../common/btn"
    import SearchText from "../search/SearchText"
    import {filterOn} from "../../services/calculations"

    export default {
        name: "fragment-list",
        components: {SearchText, Btn, Loader, SubpageTitle, Note, SelectableList},
        props: {
            tree: Object,
            fragments: Array,
            fragment: String,
            none: String,
            note: String,
            forced: {type: Boolean, default: false},
            selectionKey: {type: String, required: true},
            hide: {type: Boolean, default: false}
        },
        data: () => ({
            loading: false,
            refreshable: {type: Boolean, default: true},
            filter: ""
        }),
        created() {
            this.refresh()
        },
        watch: {
            tree: function () {
                this.refresh()
            }
        },
        computed: {
            rawItems() {
                return this.tree && this.tree[this.fragment || this.fragments[0]] || []
            },
            items() {
                return filterOn("name")(this.rawItems, this.filter)
            }
        },
        methods: {
            ...mapActions({loadTreeFragment: On.UPDATE_TREE}),
            update: function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: this.fragments || [this.fragment]})
                    .then(() => setTimeout(() => this.loading = false))
            },
            refresh: async function () {
                this.tree && (this.forced || !this.tree[this.fragment]) && this.update()
            }
        },
    }
</script>