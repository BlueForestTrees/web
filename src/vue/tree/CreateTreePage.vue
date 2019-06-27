<template>
    <card>
        <subpage-title title="Nouveau produit" icon-class="scope-tree logo"/>
        <create-tree @create="treeCreated"/>
    </card>
</template>

<script>
    import Card from "../common/Card"
    import SubpageTitle from "./SubpageTitle"
    import On from "../../const/on"
    import {mapActions, mapMutations} from "vuex"
    import Do from "../../const/do"
    import Connected from "../mixin/Connected"
    const CreateTree = () => import(/* webpackChunkName: "CreateTree" */ './CreateTree')


    export default {
        name: 'create-tree-page',
        mixins: [Connected],
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