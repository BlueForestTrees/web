<template>
    <v-list v-if="hasItems">
        <template v-if="hasItems && item._id !== exceptId" v-for="(item,i) in items">
            <div :key="item._id" @click="select(item)" class="v-list__tile" :style="{paddingTop:'8px',paddingBottom:'8px',height:'auto', background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-layout row>
                    <v-list-tile-content v-if="!noQt">{{qtUnitName(item)}}</v-list-tile-content>
                    <v-list-tile-content v-else>{{name(item)}}</v-list-tile-content>
                </v-layout>
            </div>
            <v-divider v-if="i+1 < items.length"/>
        </template>
    </v-list>
    <div v-else>
        <slot name="no-items">
            <v-layout class="align-center justify-center my-5 font-weight-thin subheading font-italic">
                <slot name="none"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas d'informations</slot>
            </v-layout>
        </slot>
    </div>
</template>
<script>
    import selectable from "../mixin/Selectable"
    import {qtUnitName, name, color} from "../../services/calculations"

    export default {
        name: "selectable-list",
        props: {
            nobar: Boolean,
            items: Array,
            maxSelectionSize: Number,
            exceptId: String,
            noQt: {type: Boolean, default: false},
            selectionKey: {type: String, required: true}
        },
        mixins: [selectable],
        computed: {
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            }
        },
        methods: {
            qtUnitName, name, color,
            select(item) {
                this.toggleSelect(item)
                this.$emit('select', item)
            }
        }
    }
</script>