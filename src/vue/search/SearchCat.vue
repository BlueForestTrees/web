<template>
    <span>
        <div>
            <v-layout row align-center>
                <v-breadcrumbs>
                  <v-icon slot="divider">arrow_forward_ios</v-icon>
                  <v-breadcrumbs-item key="root"><span @click="pathSelect(null)">Tout</span></v-breadcrumbs-item>
                  <v-breadcrumbs-item v-for="item in selection" :key="item._id"><span @click="pathSelect(item)">{{ item.name }}</span></v-breadcrumbs-item>
                </v-breadcrumbs>
            </v-layout>
            <v-divider/>
        </div>

        <v-card-text v-if="items.length > 0" class="not-too-small">
            <span v-if="anySelected">Sous-catégories</span>
            <v-layout row align-center wrap>
                <loader v-if="loading"/>
                <v-flex v-else-if="items.length > 0" v-for="item in items" @click="select(item)" :key="'o'+item._id">
                    <a><v-layout row align-center><v-icon :style="'color: '+item.color">stop</v-icon><a style="padding-right:0.5em">{{item.name}}</a></v-layout></a>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text>
            <v-layout row>
                <v-spacer/>
                <v-btn color="primary" @click="emitSelect">Ok</v-btn>
            </v-layout>
        </v-card-text>
    </span>
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