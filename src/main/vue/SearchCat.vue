<template>
    <span>

        <expendable title="Catégories">
            <v-breadcrumbs style="padding-top: 0;padding-bottom: 0">
              <v-icon slot="divider">arrow_forward_ios</v-icon>
              <v-breadcrumbs-item key="root"><span @click="pathSelect(null)">Tout</span></v-breadcrumbs-item>
              <v-breadcrumbs-item v-for="item in selection" :key="item._id">
                  <span @click="pathSelect(item)">{{ item.name }}</span>
              </v-breadcrumbs-item>
            </v-breadcrumbs>

            <v-card-text>
                <v-layout row align-center wrap>
                    <v-flex v-if="items.length > 0" v-for="item in items" @click="select(item)"
                            :key="'o'+item._id" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                        <v-layout row align-center>
                            <v-icon v-if="isSelected(item)" color="green" style="margin-right:0.3em">check_circle</v-icon>
                            <v-icon v-else :style="'color: '+item.color">stop</v-icon>
                            <a style="padding-right:0.5em">{{item.name}}</a>
                        </v-layout>
                </v-flex>
                </v-layout>
            </v-card-text>
        </expendable>
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
        data: function () {
            return {
                items: [],
                cache: {}
            }
        },
        methods: {
            ...mapActions({loadCats: On.LOAD_CATEGORIES}),
            getCats: async function (pid) {
                this.items = this.cache[pid] || await this.loadCats(pid)
                this.cache[pid] = this.items
            },
            select(item) {
                if (this.toggleSelect(item)) {
                    this.getCats(item._id)
                }
                this.emitSelect()
            },
            pathSelect(item) {
                if (item) {
                    this.toggleSelect(item, {after: true})
                } else {
                    this.unselect()
                }
                this.getCats(this.lastSelected && this.lastSelected._id)
                this.emitSelect()
            },
            emitSelect() {
                this.$emit("select", this.selection)
            }
        },
        created: function () {
            this.getCats(null)
        }
    }
</script>