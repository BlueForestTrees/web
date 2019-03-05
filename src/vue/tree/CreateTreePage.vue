<template>
    <card>
        <subpage-title title="Nouveau produit" icon-class="scope-tree logo"/>
        <create-tree @create="treeCreated"/>
    </card>
</template>

<script>
    import Card from "../common/Card"
    import SubpageTitle from "./SubpageTitle"
    import CreateTree from "./CreateTree"
    import On from "../../const/on"
    import {mapActions, mapMutations} from "vuex"
    import Do from "../../const/do"

    export default {
        name: 'create-tree-page',
        components: {CreateTree, SubpageTitle, Card},
        methods: {
            ...mapActions({goTree: On.GO_TREE}),
            ...mapMutations({setTree: Do.OPEN_TREE}),
            treeCreated(tree) {
                this.setTree(tree)
                this.goTree(tree)
            }
        }
    }
</script>