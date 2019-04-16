<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="title" class="font-weight-medium">{{title}}</span>
                <span v-else>Propriété</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>
                <v-layout :column="$vuetify.breakpoint.xsOnly" class="grey lighten-5" pa-2 align-center>
                    <v-layout row ml-3 align-center>
                        <a @click="select(null)" class="no-wrap mx-2">toutes les propriétés</a>
                        <a v-if="facet" @click="select(facet)" class="no-wrap mx-2">{{title}}</a>
                    </v-layout>
                </v-layout>
                <entry-list @select="select" :action="On.SEARCH_FACET_ENTRY"/>
            </v-layout>
        </v-card>
    </v-menu>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import MenuPicker from "./MenuPicker"
    import EntryList from "../impact/EntriesList"
    import On from "../../const/on"

    export default {
        name: "FacetPicker",
        mixins: [MenuPicker],
        props: ['value'],
        components: {EntryList, SelectableList},
        data: function () {
            return {
                facet: this.value,
                On
            }
        },
        methods: {
            select(facet) {
                this.facet = facet
                this.menuVisible = false
                this.$emit("input", this.facet)
            }
        },
        computed: {
            title() {
                return this.facet && this.facet.name
            }
        }
    }
</script>
