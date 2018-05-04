<template>
    <v-list two-line>
        <v-subheader>Bilan Impacts
            <v-spacer/>
            <v-tooltip top>
                <span slot="activator"><v-icon color="grey lighten-1">info</v-icon></span>
                <span>BILAN IMPACTS : C'est la somme des impacts du produit/service avec le "bilan impacts" des ressources.</span>
            </v-tooltip>
        </v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="item.name">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import QtUnit from "../common/QtUnit";
    import {hasQuantity} from "../../services/calculations";

    export default {
        components: {QtUnit},
        name: 'bilan-impacts',
        props: ["tree"],
        computed: {
            items: function () {
                return this.tree && this.tree.impactsTank && this.tree.impactsTank.items;
            }
        },
        methods:{
            hasQuantity
        }
    }
</script>