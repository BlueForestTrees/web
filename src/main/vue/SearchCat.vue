<template>
    <span>
        <v-breadcrumbs>
          <v-icon slot="divider">arrow_forward_ios</v-icon>
          <v-breadcrumbs-item key="root"><span @click="pathSelect(null)">Catégories</span></v-breadcrumbs-item>
          <v-breadcrumbs-item v-for="item in selection" :key="item._id">
              <span @click="pathSelect(item)">{{ item.name }}</span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-divider/>
        <v-divider/>
        <v-list-tile :key="'o'+item._id" v-if="items.length > 0" v-for="item in items"
                     @click="select(item)"
                     :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green" style="margin-right:0.3em">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.color+';margin-right:0.3em'">stop</v-icon>
            {{item.name}}
        </v-list-tile>
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