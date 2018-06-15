<template>
    <span>
        <v-chip v-if="basket.length > 0" v-for="item in basket"
                close :key="item._id" @input="remove(item)">
            <v-avatar>
                <v-icon x-large :style="{color:item.trunk.color}">lens</v-icon>
            </v-avatar>
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