<template>
    <svg :viewBox="viewBox" version="1.2" xmlns="http://www.w3.org/2000/svg">

        <template v-for="branch in branchesList">
            <g :key="branch.tree._id+'b'">
                <line class="line" :x1="branch.x" :y1="branch.y" :x2="branch.parent.x" :y2="branch.parent.y"></line>
                <line class="line dash" v-if="!branch.tree.branches" :x1="branch.x" :y1="branch.y" :x2="branch.x" :y2="branch.y-sY*0.7"></line>
                <trunk :key="branch.tree._id" :x="branch.x" :y="branch.y" :tree="branch.tree" :selected="isSelected(branch.tree)" @click="select(branch, BRANCHES)"/>
            </g>
        </template>


        <template v-for="root in rootsList">
            <g :key="root.tree._id">
                <line class="line" :x1="root.x" :y1="root.y" :x2="root.parent.x" :y2="root.parent.y"></line>
                <line class="line dash" v-if="!root.tree.roots" :x1="root.x" :y1="root.y" :x2="root.x" :y2="root.y+sY*0.7"></line>
                <trunk :key="root.tree._id" :x="root.x" :y="root.y" :tree="root.tree" :selected="isSelected(root.tree)" @click="select(root, ROOTS)"/>
            </g>
        </template>

        <trunk :tree="tree" trunk :selected="isSelected(tree)" @click="selectTrunk(tree)"/>

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
    import TWEEN from "@tweenjs/tween.js"

    export default {
        name: "TreeNav2",
        components: {Trunk, Note},
        mixins: [Selectable],
        props: ['tree', 'note'],
        data: () => ({
            BRANCHES, ROOTS,
            rootsOk: false,
            branchesOk: false,
            zoom: 1, size: 1000,
            panx: 0, pany: 0,
            sX: 250, sY: 150,
            maxSelectionSize: 1
        }),
        mounted() {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)

            this.loadTreeFragment({tree: this.tree, fragments: [ROOTS]})
                .then(() => this.tree[ROOTS].forEach(root => this.loadTreeFragment({tree: root, fragments: [ROOTS]})))
                .then(() => this.rootsOk = true)

            this.loadTreeFragment({tree: this.tree, fragments: [BRANCHES]})
                .then(() => this.tree[BRANCHES].forEach(root => this.loadTreeFragment({tree: root, fragments: [BRANCHES]})))
                .then(() => this.branchesOk = true)
        },
        computed: {
            viewBox: function () {
                const size = this.zoom * this.size
                return `${-0.5 * size + this.panx} ${-0.25 * size + this.pany} ${size} ${0.5 * size}`
            },
            rootsList() {
                return this.rootsOk &&
                    treePlacement(this.tree, ROOTS, this.sX, this.sY)
            },
            branchesList() {
                return this.branchesOk &&
                    treePlacement(this.tree, BRANCHES, this.sX, -this.sY)
            }
        },
        methods: {
            ...mapActions({loadTreeFragment: On.UPDATE_TREE}),
            selectTrunk(tree) {
                this.toggleSelect(tree)
                this.lookAt({x: 0, y: 0})
            },
            async select(drawTree, fragment) {
                const tree = drawTree.tree
                this.toggleSelect(tree)
                this.lookAt(drawTree)
                if (this.isSelected(tree)) {
                    if (!tree[fragment]) {
                        await this.loadTreeFragment({tree, fragments: [fragment]})
                    }
                }
            },
            lookAt({x, y}) {
                const current = {x: this.panx, y: this.pany}

                new TWEEN.Tween(current)
                    .to({x, y}, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        this.panx = current.x
                        this.pany = current.y
                    })
                    .start()
            }
        },
    }
</script>

<style>
    .line {
        stroke: #444444;
    }

    .dash{
        stroke-dasharray: 5,5;
    }

    .pin {
        stroke: #444444;
        stroke-width: 1px;
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
        font-size: 1.5em;
        color: #444444;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>