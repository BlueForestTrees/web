<template>
    <v-container>
        <loader v-if="!commons" :text="loading"/>
        <v-list v-else-if="commons.length > 0" subheader>
            <v-list-tile :key="item._id" v-for="item in commons" @click="$emit('select',item)">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-container v-else>
            <v-layout column align-center>
                <p class="font-weight-medium">
                    <v-icon color="green" class="mr-2">info</v-icon>
                    {{noItem || "Il n'y a pas d'information commune à ces produits :("}}
                </p>
            </v-layout>
        </v-container>
    </v-container>
</template>
<script>
    import Loader from "../loader/Loader"
    import On from "../../const/on"
    import {extractCommons} from "../../services/calculations"
    import {mapActions} from "vuex"

    export default {
        name: "common-attribute",
        components: {Loader},
        props: ['noItem', 'loading', 'treesIds', 'type'],
        data: () => ({commons: null, trees: null}),
        methods: {
            ...mapActions({loadTrees: On.LOAD_TREES}),
            async refresh() {
                if (this.treesIds && this.treesIds.length > 0) {
                    this.trees = await this.loadTrees({treesIds: this.treesIds, fragments: [this.type]})
                    for (let i = 0; i < this.trees.length; i++) {
                        await this.trees[i].promises.all
                    }
                    this.commons = extractCommons(this.trees, this.type)
                } else {
                    this.commons = null
                }
            }
        },
        created() {
            this.refresh()
        }
    }
</script>