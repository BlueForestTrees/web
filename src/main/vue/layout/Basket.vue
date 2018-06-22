<template>
    <span>
        <v-list v-if="basket.length === 1">
            <v-list-tile>
                <v-icon x-large :style="{color:basket[0].trunk.color,marginRight:'0.2em'}">lens</v-icon><h3>{{qtUnitName(basket[0].trunk)}}</h3>
                <v-spacer/>
                <v-btn icon flat @click="remove(basket[0])"><v-icon x-large color="grey">close</v-icon></v-btn>
            </v-list-tile>
        </v-list>
        <v-chip v-if="basket.length > 1" v-for="item in basket" close :key="item._id" @input="remove(item)">
            <v-avatar><v-icon x-large :style="{color:item.trunk.color}">lens</v-icon></v-avatar>
            <span>{{qtUnitName(item.trunk)}}</span>
        </v-chip>
    </span>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import Do from "../../const/do";
    import {qtUnitName} from "../../services/calculations";

    export default {
        name: 'basket',
        computed: {
            ...mapState(['basket'])
        },
        methods: {
            ...mapMutations({remove: Do.REMOVE_FROM_BASKET}),
            qtUnitName
        }
    }
</script>