<template>
    <svg id="surface" ref="surface" class="surface"
         v-pan="pan"
         v-pinch="pinch"
         v-on:mousewheel="mousewheel"
         v-resize="resize"
         :viewBox="viewBox">

        <template v-for="branch in branchList">
            <g :key="branch.linkId">
                <line class="line" :x1="branch.x" :y1="branch.y" :x2="branch.parent.x" :y2="branch.parent.y"></line>
                <line class="line" v-if="!branch.tree.branches" :x1="branch.x" :y1="branch.y" :x2="branch.x" :y2="branch.y-sY*0.3"></line>
                <trunk :key="branch.tree._id" :x="branch.x" :y="branch.y" :tree="branch.tree" :selected="isSelected(branch.tree)" @click="treeClick(branch, BRANCHES)"/>
            </g>
        </template>

        <template v-for="root in rootList">
            <g :key="root.linkId">
                <line class="line" :x1="root.x" :y1="root.y" :x2="root.parent.x" :y2="root.parent.y"></line>
                <line class="line" v-if="!root.tree.roots" :x1="root.x" :y1="root.y" :x2="root.x" :y2="root.y+sY*0.3"></line>
                <trunk :key="root.tree._id" :x="root.x" :y="root.y" :tree="root.tree" :selected="isSelected(root.tree)" @click="treeClick(root, ROOTS)"/>
            </g>
        </template>

        <trunk v-if="tree" :key="trunk.tree._id" :tree="trunk.tree" trunk
               :x="trunk.x" :y="trunk.y"
               :selected="isSelected(trunk.tree)" @click="treeClick(trunk)"
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
    import TWEEN from "@tweenjs/tween.js"
    import Static from "../mixin/Static"
    import {initTween, tweenNodes} from "../../services/anim"
    import Vue from "vue"
    import Hammer from 'hammerjs'

    Vue.directive("pan", {
        bind: function (el, binding) {
            if (typeof binding.value === "function") {
                const mc = new Hammer(el)
                mc.get("pan").set({direction: Hammer.DIRECTION_ALL})
                mc.on("pan", binding.value)
            }
        }
    })
    Vue.directive("pinch", {
        bind: function (el, binding) {
            if (typeof binding.value === "function") {
                const mc = new Hammer(el)
                mc.get("pinch").set({enable: true})
                mc.on("pinch", binding.value)
            }
        }
    })

    export default {
        name: "TreeMap",
        components: {Trunk, Note},
        mixins: [Selectable, Static],
        props: ['tree', 'note', 'selectionKey'],
        static: {
            BRANCHES, ROOTS,
            sX: 250, sY: 150,
            menuLeftWidth: 225,
            scaleMin: 0.4, scaleMax: 10,
            pointer: {down: null},
        },
        data: () => ({
            paddingLeft: 0,
            width: 1000,
            height: 1000,
            scale: 1,
            panx: 0, pany: 0,
            maxSelectionSize: 1,
            trunkDx: 0,
            trunkDy: 0,
            rootList: [],
            branchList: [],
        }),
        mounted() {
            initTween()
        },
        watch: {
            "tree.trunk._id"() {
                this.updateTrunk()
            },
            preRootsList(n) {
                this.rootList = n
            },
            rootList(n, o) {
                tweenNodes(n, o)
            },
            preBranchesList(n) {
                this.branchList = n
            },
            branchList(n, o) {
                tweenNodes(n, o)
            }
        },
        computed: {
            viewW: function () {
                return this.scale * this.width
            },
            viewH: function () {
                return this.scale * this.height
            },
            viewOriginX: function () {
                return -0.5 * this.viewW + this.scale * (this.panx - this.paddingLeft)
            },
            viewOriginY: function () {
                return -0.5 * this.viewH + this.scale * this.pany
            },
            viewBox: function () {
                return `${this.viewOriginX} ${this.viewOriginY} ${this.viewW} ${this.viewH}`
            },
            trunk() {
                return {tree: this.tree, x: this.trunkDx, y: this.trunkDy}
            },
            preRootsList() {
                // console.log("tree placement roots")
                return treePlacement(this.trunk.tree, ROOTS, this.sX, this.sY, this.trunk.x, this.trunk.y)
            },
            preBranchesList() {
                // console.log("tree placement branches")
                return treePlacement(this.trunk.tree, BRANCHES, this.sX, -this.sY, this.trunk.x, this.trunk.y)
            }
        },
        methods: {
            ...mapActions({
                loadTreeFragment: On.UPDATE_TREE
            }),
            mousewheel(evt) {
                const zoomDelta = -evt.deltaY / 1000
                this.applyZoom(this.scale + zoomDelta)
            },
            pinch(evt) {
                this.pan(evt)
                if (evt.srcEvent.type === "pointerdown") {
                    this.pointer.down = this.scale
                } else {
                    this.applyZoom(this.pointer.down / evt.scale)
                }
            },
            pan(evt) {
                this.lookAt({x: this.panx - evt.srcEvent.movementX, y: this.pany - evt.srcEvent.movementY}, true)
            },
            resize: function (e) {
                this.width = window.innerWidth
                this.height = window.innerHeight
            },
            async treeClick({tree, x, y}, fragment) {
                this.toggleSelect(tree)
                this.isSelected(tree) && this.lookAt({x: x / this.scale, y: y / this.scale})
                this.isSelected(tree) && fragment && !tree[fragment] && await this.loadFragment(tree, [fragment])
            },
            async loadFragment(tree, fragments) {
                return await this.loadTreeFragment({tree, fragments})
            },
            lookAt({x = 0, y = 0}, now = false) {
                if (now) {
                    this.panx = x
                    this.pany = y
                } else {
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
            applyZoom(zoom) {
                this.scale = Math.min(this.scaleMax, Math.max(this.scaleMin, zoom))
            },
            updateTrunk() {
                this.lookAt({}, true)
                this.select(this.tree)
                this.loadFragment(this.tree, [BRANCHES, ROOTS])
            }
        },
    }
</script>

<style>
    .surface {
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        pointer-events: all
    }

    .line {
        stroke: #444444;
    }

    .dash {
        stroke-dasharray: 5, 5;
    }

    .pin {
        stroke: #444444;
        stroke-width: 1px;
    }

    .selection {
        stroke: #22B573;
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
        background-color: rgba(250, 250, 250, 0.8);
    }
</style>