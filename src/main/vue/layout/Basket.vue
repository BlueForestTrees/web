<template>
    <v-card style="width: 100%">
        <v-card-title primary-title>
            <div class="headline">Panier</div>
        </v-card-title>
        <v-card-text v-if="basket.length === 0">
            <div>Votre panier est vide. Faites une recherche.</div>
        </v-card-text>
        <v-container>
            <v-layout>
                <v-flex :class="isSelected(item) ? 'elevation-6':''" v-if="basket.length > 0"
                        v-for="item in basket" :key="item._id" @input="remove(item)">
                    <v-chip close :style="{backgroundColor:shadeColor(item.trunk.color,0.65)}"
                            @click="toggleSelect(item)" @input="remove(item)">
                        <v-avatar>
                            <v-icon x-large :style="{color:item.trunk.color}">lens</v-icon>
                        </v-avatar>
                        <span>{{qtUnitName(item.trunk)}}</span>
                    </v-chip>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card-actions>
            <v-spacer/>
            <v-btn flat color="primary" :disabled="!oneSelected" @click="consult(oneSelected)">Consulter</v-btn>
            <v-btn flat color="primary" :disabled="!twoSelected" @click="compare">Comparer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import Do from "../../const/do";
    import {qtUnitName, shadeColor} from "../../services/calculations";
    import {mapActions} from "vuex";
    import On from "../../const/on";
    import selectable from "../mixin/Selectable";

    export default {
        name: 'basket',
        mixins: [selectable],
        computed: {
            ...mapState(['basket'])
        },
        methods: {
            ...mapActions({compare: On.SELECT_COMPARE, consult: On.GO_TREE}),
            ...mapMutations({remove: Do.REMOVE_FROM_BASKET}),
            qtUnitName, shadeColor
        }
    }
</script>