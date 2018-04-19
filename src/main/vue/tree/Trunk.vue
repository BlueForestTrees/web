<template>
    <v-list two-line>
        <v-list-tile avatar @click="">
            <v-list-tile-content>
                <v-list-tile-title>Quantité</v-list-tile-title>
                <v-list-tile-sub-title>
                    <qt-unit :quantity="trunk.quantity"/>
                </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {mapActions} from 'vuex';
    import On from "../../const/on";
    import {QUANTITY} from "../../const/labels";
    import QtUnit from "../common/QtUnit";

    export default {
        components: {
            QtUnit
        },
        props: ['trunk'],
        methods: {
            ...mapActions({
                putQuantity: On.PUT_TRUNK_QUANTITY,
                renameTrunk: On.RENAME_TRUNK
            }),
            validateQt(newQt) {
                const unit = (this.trunk.quantity && this.trunk.quantity.unit) || null;
                this.putQuantity({trunk: this.trunk, quantity: {qt: newQt, unit}});
            },
            validateUnit(newUnit) {
                const qt = (this.trunk.quantity && this.trunk.quantity.qt) || 1;
                this.putQuantity({trunk: this.trunk, quantity: {qt, unit: newUnit.shortname}});
            },
            validateRenaming(newName) {
                this.renameTrunk({trunk: this.trunk, newName});
            }
        },
        data: function () {
            return {
                QUANTITY: QUANTITY
            }
        }
    }
</script>