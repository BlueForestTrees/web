<template>
    <svg :viewBox="viewBox" version="1.2" xmlns="http://www.w3.org/2000/svg">
        <!--<line v-for="(branch,i) in tree.branches" :key="'line'+branch._id" stroke="black"-->
        <!--x1="0" y1="0"-->
        <!--:x2="x(i, tree.branches.length)" :y2="-view.spaceY">-->
        <!--</line>-->
        <!--<trunk v-for="(branch,i) in tree.branches" :key="branch._id" root-->
        <!--:x="x(i, tree.branches.length)" :y="-view.spaceY"-->
        <!--:tree="branch" :selected="isSelected(branch)"-->
        <!--@click="toggleSelect"-->
        <!--/>-->


        <!--<line v-for="(branch,i) in tree.roots" :key="'line'+branch._id" stroke="black"-->
        <!--x1="0" y1="0"-->
        <!--:x2="x(i, tree.roots.length)" :y2="view.spaceY">-->
        <!--</line>-->
        <!--<trunk v-for="(root,i) in tree.roots" :key="root._id" root-->
        <!--:x="x(i, tree.roots.length)" :y="view.spaceY"-->
        <!--:tree="root" :selected="isSelected(root)"-->
        <!--@click="toggleSelect"-->
        <!--/>-->

        <!--<template v-for="(roots,y) in rootsStack">-->
        <!--<g>-->
        <!--<line v-for="(root,i) in roots" :key="'line'+root._id" stroke="black"-->
        <!--x1="0" :y1="y*view.spaceY"-->
        <!--:x2="x(i, roots.length)" :y2="(1+y)*view.spaceY">-->
        <!--</line>-->
        <!--<trunk v-for="(root,i) in roots" :key="root._id" root-->
        <!--:x="x(i, roots.length)" :y="(1+y)*view.spaceY"-->
        <!--:tree="root" :selected="isSelected(root)"-->
        <!--@click="select(root, y+1)"-->
        <!--/>-->
        <!--</g>-->
        <!--</template>-->

        <!--<trunk :x="0" :y="0"-->
        <!--:tree="tree" :selected="isSelected(tree)"-->
        <!--@click="toggleSelect"-->
        <!--/>-->

        <trunk v-for="root in nodeList" :key="root.tree._id" root
               :x="root.x*view.spaceX" :y="root.y*view.spaceY"
               :tree="root.tree" :selected="isSelected(root.tree)"
               @click="select(root, y+1)"
        />

    </svg>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Selectable from "../mixin/Selectable"
    import {BRANCHES, ROOTS} from "../../const/fragments"
    import Note from "../common/Note"
    import Trunk from "./Trunk"
    import {treePlacement} from "../../services/tree"

    export default {
        name: "TreeNav2",
        components: {Trunk, Note},
        mixins: [Selectable],
        props: ['tree', 'note'],
        data: () => ({
            view: {
                zoom: 2,
                size: 1000,
                panx: 0,
                pany: 0,
                spaceX: 250,
                spaceY: 150
            },
            maxSelectionSize: 1,
            rootsStack: []
        }),
        mounted() {
            this.refreshRoots(this.tree)
            this.refreshBranches(this.tree)
        },
        computed: {
            viewBox: function () {
                const size = this.view.zoom * this.view.size
                const panx = this.view.panx
                const pany = this.view.pany
                return `${panx + -0.5 * size} ${pany + -0.25 * size} ${size} ${0.5 * size}`
            },
            nodeList: function () {
                return treePlacement(this.tree, "roots")
            }
        },
        methods: {
            ...mapActions({updateTree: On.UPDATE_TREE}),
            select(root, depth) {
                this.refreshRoots(root, depth)
            },
            x(i, count) {
                return -0.5 * (count - 1) * this.view.spaceX + i * this.view.spaceX
            },
            async refreshRoots(tree) {
                await this.updateTree({tree, fragments: [ROOTS]})
            },
            async refreshBranches(tree) {
                await this.updateTree({tree, fragments: [BRANCHES]})
            },
        },
    }
</script>

<style>


    .pin {
        stroke: #444444;
        stroke-width: 2px;
    }

    .selection {
        stroke: #D21E1E;
        stroke-opacity: 0.5;
        stroke-width: 8px;
        fill: none;
    }

    .root .pin {
        fill: white;
    }

    .trunk .pin {
        fill: #1565c0;
    }

    .text {
        pointer-events: none;
        line-height: 1em;
        alignment-baseline: hanging;
        font-size: 2em;
        color: #444444;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>