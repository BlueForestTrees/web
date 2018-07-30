<template>
    <span style="width: 100%">
        <v-card-title primary-title>
            <p style="padding-right:1em">{{label || 'Filtre'}}</p>
            <v-text-field label="Nom" autofocus v-model="namePart"/>
        </v-card-title>

        <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
            {{item.trunk.name}}
        </v-list-tile>

        <transition name="slide-fade">
            <v-toolbar v-if="!nobar && anySelected" app dark class="elevation-0" color="green lighten-2">
                <slot :s="this">

                </slot>
            </v-toolbar>
        </transition>
    </span>
</template>

<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import {mapActions} from "vuex"

    export default {
        name: 'search-comp',
        props: {label: String, type: String, nobar: Boolean},
        mixins: [selectable],
        data() {
            return {
                namePart: null,
                items: null
            }
        },
        computed: {
            query: function () {
                return {
                    term: this.namePart || "",
                    type: this.type
                }
            }
        },
        created: function () {
            this.namePart = ""
        },
        watch: {
            query: function (query) {
                this.dispatchSearch(query)
                    .then(items => this.items = items)
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
            })
        }
    }
</script>