<template>
    <panel title="Catégorie" @close="close">
        <v-icon slot="left" large class="mx-3 mt-3" color="primary" style="align-items:normal">category</v-icon>
        <v-layout column py-2>
            <v-layout row wrap justify-center>
                <template v-if="anySelected">
                    <a @click="pathSelect(null)" class="no-wrap">Toutes les catégories</a>
                    <v-icon small>keyboard_arrow_right</v-icon>
                </template>
                <template v-for="(cat, i) in selection">
                    <a @click="pathSelect(cat)" class="no-wrap">{{cat.name}}</a>
                    <v-icon small v-if="i+1 < selection.length">keyboard_arrow_right</v-icon>
                </template>
            </v-layout>

            <v-divider v-if="anySelected && items && items.length" class="py-2"/>

            <v-layout row wrap justify-center>
                <loader v-if="loading"/>
                <a v-else-if="items.length > 0" v-for="item in items" @click="select(item)" :key="'o'+item._id">
                    <v-layout row align-center>
                        <v-icon :style="'color: '+item.color">stop</v-icon>
                        <a style="padding-right:0.5em">{{item.name}}</a>
                    </v-layout>
                </a>
            </v-layout>
        </v-layout>
    </panel>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import selectable from "../mixin/Selectable"
    import Loader from "../loader/Loader"
    import MenuPicker from "./MenuPicker"
    import Panel from "./Panel"
    import Icon from "../common/icon"

    export default {
        name: "CategoriesPanel",
        components: {Icon, Panel, Loader},
        mixins: [selectable],
        props: ['value'],
        data: function () {
            return {
                cache: {},
                items: [],
                loading: false
            }
        },
        methods: {
            ...mapActions({dispatchLoadCats: On.LOAD_CATEGORIES}),
            loadCats: async function (pid) {
                this.items = this.cache[pid] || await this.dispatchLoadCats(pid)
                this.cache[pid] = this.items
            },
            async select(item) {
                this.loading = true
                if (this.toggleSelect(item)) {
                    await this.loadCats(item._id)
                }
                this.loading = false
                this.emitInput()
            },
            pathSelect(item) {
                if (item) {
                    this.toggleSelect(item, {andAfter: true})
                } else {
                    this.unselect()
                }
                this.loadCats(this.lastSelected && this.lastSelected._id)
                this.emitInput()
            },
            emitInput() {
                const selection = this.selection.slice()
                this.$emit("input", selection)
            },
            close() {
                this.$emit('close')
                this.unselect()
            }
        },
        computed: {
            title() {
                return this.value && this.value.length > 0 && this.value[this.value.length - 1].name
            }
        },
        created: function () {
            this.loadCats(null)
        },
    }
</script>