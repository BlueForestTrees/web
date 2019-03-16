<template>
    <div class="enough-high-small">
        <subpage-title v-if="note" :title="note" sub color="whitegrey">
            <slot name="right" slot="right"></slot>
        </subpage-title>

        <slot name="subbar"></slot>

        <template v-if="!hide">
            <loader v-if="loading"/>
            <selectable-list v-else :items="items" :maxSelectionSize="1" :selectionKey="selectionKey"/>
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

    export default {
        name: "fragment-list",
        components: {Btn, Loader, SubpageTitle, Note, SelectableList},
        props: {
            tree: Object,
            fragment: String,
            none: String,
            note: String,
            forced: {type: Boolean, default: false},
            selectionKey: {type: String, required: true},
            hide: {type: Boolean, default: false}
        },
        data: () => ({loading: false, refreshable: {type: Boolean, default: true}}),
        created() {
            this.refresh()
        },
        watch: {
            tree: function () {
                this.refresh()
            }
        },
        computed: {
            items() {
                return this.tree && this.tree[this.fragment]
            }
        },
        methods: {
            ...mapActions({loadTreeFragment: On.UPDATE_TREE}),
            update: function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: [this.fragment]})
                    .then(() => setTimeout(() => this.loading = false))
            },
            refresh: async function () {
                this.tree && (this.forced || !this.tree[this.fragment]) && this.update()
            }
        },
    }
</script>