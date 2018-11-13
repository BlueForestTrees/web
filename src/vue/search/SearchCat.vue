<template>
    <v-layout row class="not-too-small">
        <div v-if="anySelected" class="grey lighten-5" style="min-width: 12em;">
            <v-card-text>
                <v-layout column align-center>
                    <a @click="pathSelect(null)">Tout</a>
                    <v-icon v-if="anySelected" small>keyboard_arrow_down</v-icon>
                    <template v-for="(cat, idx) in selection">
                        <v-layout column v-if="idx < selection.length-1">
                            <a @click="pathSelect(cat)">{{cat.name}}</a>
                            <v-icon small>keyboard_arrow_down</v-icon>
                        </v-layout>
                        <a v-else><b>{{cat.name}}</b></a>
                    </template>
                    <v-layout column>
                        <v-spacer/>
                        <v-btn v-if="anySelected" color="primary" @click="emitSelect">Ok</v-btn>
                    </v-layout>
                </v-layout>
            </v-card-text>
        </div>
        <v-container v-if="loading || items.length > 0">
                <v-card-text class="not-too-small">
                    <v-layout column wrap>
                        <loader v-if="loading"/>
                        <a v-else-if="items.length > 0" v-for="item in items" @click="select(item)" :key="'o'+item._id">
                            <v-layout row align-center><v-icon :style="'color: '+item.color">stop</v-icon><a style="padding-right:0.5em">{{item.name}}</a></v-layout>
                        </a>
                    </v-layout>
                </v-card-text>
        </v-container>
    </v-layout>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import selectable from "../mixin/Selectable"
    import Loader from "../loader/Loader"

    export default {
        name: "search-cat",
        components: {Loader},
        mixins: [selectable],
        props: ['value'],
        data: function () {
            return {
                items: [],
                cache: {},
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
            },
            pathSelect(item) {
                if (item) {
                    this.toggleSelect(item, {andAfter: true})
                } else {
                    this.unselect()
                }
                this.loadCats(this.lastSelected && this.lastSelected._id)
            },
            emitSelect() {
                this.$emit("input", this.selection.slice())
                this.$nextTick(() => this.pathSelect(null))
            }
        },
        created: function () {
            this.loadCats(null)
        }
    }
</script>