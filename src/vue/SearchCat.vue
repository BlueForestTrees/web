<template>
    <span>
        <div v-if="anySelected">
            <v-layout row align-center>
                <v-breadcrumbs>
                  <v-icon slot="divider">arrow_forward_ios</v-icon>
                  <v-breadcrumbs-item key="root"><span @click="pathSelect(null)">Tout</span></v-breadcrumbs-item>
                  <v-breadcrumbs-item v-for="item in selection" :key="item._id"><span @click="pathSelect(item)">{{ item.name }}</span></v-breadcrumbs-item>
                </v-breadcrumbs>
                <v-spacer/>
                <v-btn color="primary" @click="emitSelect">Ok</v-btn>
            </v-layout>
            <v-divider/>
        </div>

            <v-card-text v-if="items.length > 0">
                <span v-if="anySelected">Sous-catégories</span>
                <v-layout row align-center wrap>
                    <v-flex v-if="items.length > 0" v-for="item in items" @click="select(item)"
                            :key="'o'+item._id"
                            :style="{background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                        <a>
                            <v-layout row align-center>
                                <v-icon v-if="isSelected(item)" color="primary"
                                        style="margin-right:0.3em">check_circle</v-icon>
                                <v-icon v-else :style="'color: '+item.color">stop</v-icon>
                                <a style="padding-right:0.5em">{{item.name}}</a>
                            </v-layout>
                        </a>
                </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-text v-else>
                <p>Sous-catégories:</p>
                <p>aucune</p>
            </v-card-text>
    </span>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"
    import Expendable from "./common/Expendable"

    export default {
        name: "search-cat",
        components: {Expendable},
        mixins: [selectable],
        props: ['value'],
        data: function () {
            return {
                items: [],
                cache: {}
            }
        },
        methods: {
            ...mapActions({dispatchLoadCats: On.LOAD_CATEGORIES}),
            loadCats: async function (pid) {
                this.items = this.cache[pid] || await this.dispatchLoadCats(pid)
                this.cache[pid] = this.items
            },
            select(item) {
                if (this.toggleSelect(item)) {
                    this.loadCats(item._id)
                }
            },
            pathSelect(item) {
                if (item) {
                    this.toggleSelect(item, {after: true})
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