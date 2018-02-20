<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title style="width:100%">
                <inplace-edit :initial="trunk.name" @ok="validateRenaming"/>
            </v-toolbar-title>
        </v-toolbar>

        <div class="air">
            <v-layout row align-center>
                <span style="color:rgba(0,0,0,.54);">{{QUANTITY}}</span>
                <v-spacer/>
                <span>
                    <inplace-edit :initial="trunk.quantity && trunk.quantity.qt" @ok="validateQt"/>
                    <inplace-unit-edit :initial="trunk.quantity && trunk.quantity.unit" @ok="validateUnit"/>
                </span>
            </v-layout>
        </div>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';
    import UnitGrid from "../common/UnitGrid";
    import On from "../../const/on";
    import Loading from "../common/Loading";
    import InplaceEdit from "../common/InplaceEdit";
    import InplaceUnitEdit from "../common/InplaceUnitEdit";
    import {QUANTITY} from "../../const/labels";

    export default {
        components: {
            InplaceUnitEdit,
            InplaceEdit,
            Loading,
            UnitGrid
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