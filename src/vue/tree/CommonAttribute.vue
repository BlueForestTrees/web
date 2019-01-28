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
                    {{noItem || "Il n'y a pas d'information commune à ces deux produits :("}}
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
        props: ['noItem', 'loading', 'trees', 'type'],
        data: () => ({commons: null}),
        methods: {
            ...mapActions({updateTrees: On.UPDATE_TREES}),
            async refresh() {
                if (this.trees && this.trees.length > 1) {
                    await this.updateTrees({trees: this.trees, fragments: [this.type]})
                    this.commons = extractCommons(this.trees, this.type)
                } else {
                    this.commons = null
                }
            }
        },
        mounted() {
            this.refresh()
        }
    }
</script>