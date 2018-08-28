<template>
    <span>
         <v-card-title primary-title>
            <div class="subheading">Par catégories</div>
        </v-card-title>

            <v-breadcrumbs>
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
                        <span style="padding-right:0.5em">{{item.name}}</span>
                    </v-layout>
            </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider/>
        <v-divider/>
    </span>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"

    export default {
        name: "search-cat",
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