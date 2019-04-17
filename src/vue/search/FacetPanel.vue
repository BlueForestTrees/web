<template>
    <panel title="Propriétés" @close="$emit('close')">
        <a v-if="value" @click="emitInput(null)">{{name(value)}}
            <v-icon>edit</v-icon>
        </a>
        <entry-list v-else @select="emitInput" :action="On.SEARCH_FACET_ENTRY"/>
    </panel>
</template>

<script>
    import EntryList from "../impact/EntriesList"
    import On from "../../const/on"
    import Panel from "./Panel"
    import {name} from "../../services/calculations"


    export default {
        name: "facet-panel",
        props: ['value'],
        components: {Panel, EntryList},
        data: function () {
            return {On}
        },
        methods: {
            name,
            emitInput(v) {
                this.$emit("input", v)
            }
        }
    }
</script>
