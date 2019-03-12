<template>
    <v-flex class="enough-high-small">
        <subpage-title v-if="note" :title="note" sub color="whitegrey">
            <slot slot="right"></slot>
        </subpage-title>

        <selectable-list :items="items" :maxSelectionSize="1">
            <template slot="no-items">
                <v-layout class="align-center justify-center my-5 font-weight-thin subheading font-italic">
                    <img src="/img/broken-heart.svg" class="logo-petit ma-1"/>{{none}}
                </v-layout>
            </template>
        </selectable-list>
    </v-flex>
</template>
<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Note from "../common/Note"
    import SubpageTitle from "./SubpageTitle"

    export default {
        name: "fragment-list",
        components: {SubpageTitle, Note, SelectableList},
        props: ['tree', 'fragment', 'none', 'note'],
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
            refresh: async function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: [this.fragment]})
                this.loading = false
            }
        },
    }
</script>