<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="title" class="font-weight-medium">{{title}}</span>
                <span v-else>tous les impacts</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>
                <v-layout :column="$vuetify.breakpoint.xsOnly" class="grey lighten-5" pa-2 align-center>
                    <v-layout row ml-3 align-center>
                        <a @click="select(null)" class="no-wrap mx-2">tout les impacts</a>
                        <a v-if="impact" @click="select(impact)" class="no-wrap mx-2">{{title}}</a>
                    </v-layout>
                </v-layout>
                <entry-list @select="select" :action="On.SEARCH_IMPACT_ENTRY"/>
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
        name: "ImpactPicker",
        mixins: [MenuPicker],
        props: ['value'],
        components: {EntryList, SelectableList},
        data: function () {
            return {
                On,
                impact: this.value
            }
        },
        methods: {
            select(impact) {
                this.impact = impact
                this.menuVisible = false
                this.$emit("input", this.impact)
            }
        },
        computed: {
            title() {
                return this.impact && this.impact.name
            }
        }
    }
</script>
