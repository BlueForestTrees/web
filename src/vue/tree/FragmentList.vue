<template>
    <selectable-list :items="items" :maxSelectionSize="1" class="enough-high-small">
        <template slot="no-items">
            <v-layout class="align-center justify-center my-5 font-weight-thin title">
                <img src="/img/broken-heart.svg" class="logo-petit ma-1"/>{{none}}
            </v-layout>
        </template>
    </selectable-list>
</template>
<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "fragment-list",
        components: {SelectableList},
        props: ['tree', 'fragment', 'none'],
        created() {
            this.refresh()
        },
        computed: {
            items() {
                return this.tree && this.tree[this.fragment]
            }
        },
        methods: {
            ...mapActions({updateTree: On.UPDATE_TREE}),
            refresh: async function () {
                this.loading = true
                this.updateTree({tree: this.tree, fragments: [this.fragment]})
                this.loading = false
            }
        },
    }
</script>