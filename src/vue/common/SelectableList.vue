<template>
    <v-list>
        <v-toolbar dense v-if="!nobar && anySelected" app dark class="elevation-5" color="primary">
            <slot name="bar" :s="this"></slot>
        </v-toolbar>

        <template v-if="hasItems && item._id !== exceptId" v-for="item in items">
            <div :key="item._id" @click="toggleSelect(item)" class="v-list__tile" :style="{paddingTop:'8px',paddingBottom:'8px',height:'auto', background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-layout row>
                    <v-icon v-if="isSelected(item)" color="primary" style="margin-right:0.3em">check_circle</v-icon>
                    <v-icon v-else :style="'color: '+(item.color || item.trunk.color)+';margin-right:0.3em'">panorama_fish_eye</v-icon>
                    <v-list-tile-content>{{qtUnitName(item)}}</v-list-tile-content>
                </v-layout>
            </div>
            <v-divider/>
        </template>
        <v-list-tile v-if="!hasItems">
            <slot name="no-items">
                <h5>Pas encore d'informations</h5>
            </slot>
        </v-list-tile>
    </v-list>
</template>
<script>
    import selectable from "../mixin/Selectable"
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: "selectable-list",
        props: {nobar: Boolean, items: Array, maxSelectionSize: Number, exceptId: String},
        mixins: [selectable],
        computed: {
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            }
        },
        methods: {
            qtUnitName
        }
    }
</script>