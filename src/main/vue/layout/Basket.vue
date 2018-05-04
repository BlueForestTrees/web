<template>
    <v-card v-if="basket.length > 0" style="width:100%">
        <v-card-title>
            <v-chip close v-for="(item,i) in basket" :key="item._id" @input="remove(item)">
                <v-avatar>
                    <v-icon x-large :color="namedColors[i]" class="rightAir">lens</v-icon>
                </v-avatar>
                <span>{{item.trunk.name}}</span>
            </v-chip>
        </v-card-title>
    </v-card>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import Do from "../../const/do";

    export default {
        name: 'basket',
        computed: {
            ...mapState(['basket'])
        },
        data: function () {
            return {
                namedColors: ["cyan darken1", "pink darken1"],
                colors: ["#00A0B0", "#CC333F"]
            }
        },
        methods: {
            ...mapMutations({remove: Do.REMOVE_FROM_BASKET})
        }
    }
</script>