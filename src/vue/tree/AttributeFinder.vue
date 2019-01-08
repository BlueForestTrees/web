<template>
    <span>
        <v-list subheader>
            <v-subheader>Environnement</v-subheader>
            <loader v-if="!impactCommons"/>
            <v-list-tile v-else :key="key" v-for="(item, key) in impactCommons" @click="$emit('select',{type:IMPACT_TANK,_id:key,item})">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
            <v-subheader>Propriétés</v-subheader>
            <loader v-if="!facetCommons"/>
            <v-list-tile v-else :key="key" v-for="item in facetCommons" @click="$emit('select',{fragment:FACETS,_id:key,item})">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
            <v-subheader>Ressources</v-subheader>
            <loader v-if="!ressourceCommons"/>
            <v-list-tile v-else :key="key" v-for="(item, key) in ressourceCommons" @click="$emit('select',{fragment:FACETS,_id:key,item})">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </span>
</template>
<script>
    import Loader from "../loader/Loader"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {FACETS, IMPACT_TANK, TANK} from "../../const/fragments"
    import {extractCommons} from "../../services/calculations"

    export default {
        name: "attribute-finder",
        components: {Loader},
        props: ['trees'],
        data: () => ({
            IMPACT_TANK, FACETS, TANK,
            impactCommons: null,
            facetCommons: null,
            ressourceCommons: null
        }),
        mounted() {
            this.refresh()
        },
        methods: {
            ...mapActions({updateTrees: On.UPDATE_TREES}),
            async refresh() {
                await this.updateTrees({trees: this.trees, fragments: [TANK]})
                this.ressourceCommons = extractCommons(this.trees, TANK)

                await this.updateTrees({trees: this.trees, fragments: [IMPACT_TANK]})
                this.impactCommons = extractCommons(this.trees, IMPACT_TANK)

                await this.updateTrees({trees: this.trees, fragments: [FACETS]})
                this.facetCommons = extractCommons(this.trees, FACETS)
            }
        }
    }
</script>
