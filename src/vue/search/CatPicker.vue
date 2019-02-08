<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="title" class="font-weight-medium">Catégorie: {{title}}</span>
                <span v-else>toutes les catégories</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>

                <v-layout row wrap class="grey lighten-5" pa-2>
                    <a @click="pathSelect(null)" class="no-wrap">toutes les catégories</a>
                    <v-icon v-if="anySelected" small>keyboard_arrow_right</v-icon>
                    <template v-for="(cat, i) in selection">
                        <a @click="pathSelect(cat)" class="no-wrap">{{cat.name}}</a>
                        <v-icon small v-if="i+1 < selection.length">keyboard_arrow_right</v-icon>
                    </template>
                </v-layout>

                <v-divider/>

                <v-layout column wrap ma-2 :style="itemsStyle">
                    <loader v-if="loading" class="list-complete-item"/>
                    <a v-else-if="items.length > 0" v-for="item in items" @click="select(item)" :key="'o'+item._id" class="list-complete-item">
                        <v-layout row align-center>
                            <v-icon :style="'color: '+item.color">stop</v-icon>
                            <a style="padding-right:0.5em">{{item.name}}</a></v-layout>
                    </a>
                </v-layout>

                <v-divider/>
            </v-layout>

            <v-layout class="grey lighten-5">
                <v-spacer/>
                <v-btn color="primary" @click="emitInput">Ok</v-btn>
            </v-layout>

        </v-card>
    </v-menu>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import selectable from "../mixin/Selectable"
    import Loader from "../loader/Loader"
    import MenuPicker from "./MenuPicker"

    export default {
        name: "cat-picker",
        components: {Loader},
        mixins: [selectable, MenuPicker],
        props: ['value'],
        data: function () {
            return {
                cache: {}
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
            },
            pathSelect(item) {
                if (item) {
                    this.toggleSelect(item, {andAfter: true})
                } else {
                    this.unselect()
                }
                this.loadCats(this.lastSelected && this.lastSelected._id)
            },
            emitInput() {
                const selection = this.selection.slice()
                this.menuVisible = false
                this.$emit("input", selection)
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