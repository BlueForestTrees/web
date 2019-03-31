<template>
    <search-list :action="On.SEARCH_TREE" :filter="filter">
        <template slot-scope="{item}">
            <v-list-tile :key="item._id" avatar @click="select(item)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ name(item) }}</v-list-tile-title>
                    <v-list-tile-sub-title>quantité: {{ qtUnit(item) }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-if="item.trunk.stores">Magasins: {{item.trunk.stores}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
        </template>
    </search-list>
</template>

<script>
    import selectable from "../mixin/Selectable"
    import InfiniteLoading from 'vue-infinite-loading'
    import Loader from "../loader/Loader"
    import SelectableList from "../common/SelectableList"
    import {name, qtUnit} from "../../services/calculations"
    import SearchList from "../common/SearchList"
    import On from "../../const/on"

    export default {
        name: 'search-tree',
        data: () => ({On}),
        props: {
            maxSelectionSize: Number,
            filter: Object
        },
        mixins: [selectable],
        components: {
            SearchList,
            SelectableList,
            Loader,
            InfiniteLoading,
        },
        methods: {
            name, qtUnit,
            select(item) {
                this.$emit('select', item)
            }
        },
    }
</script>