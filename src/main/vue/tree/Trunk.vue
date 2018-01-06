<template>
    <v-card>

        <h1>{{tree.name}}</h1>


        <div v-if="qtUnitDefined">
            <v-chip>{{qtUnitDefined.qt}}{{qtUnitDefined.unit}}</v-chip>
        </div>
        <div v-else class="text-xs-center">
            <span v-if="editingQtUnit">
                <v-text-field autofocus placeholder="quantité unité (ex.: 10g)" :input="qtUnitInput"/>
                <v-btn v-if="qtUnitValid"><v-icon>valid</v-icon></v-btn>
                <unit-grid v-if="unitTyped"/>
            </span>
            <v-btn v-else @click="editingQtUnit = true" color="primary">
                Définir la quantité
                <v-icon right>edit</v-icon>
            </v-btn>
        </div>

        <div v-if="!prixDefined" class="text-xs-center">
            <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">
                    <v-icon>edit</v-icon>
                </v-avatar>
                Définir le prix
            </v-chip>
        </div>

    </v-card>
</template>

<script>
    import {Facet} from "../../const/facet";
    import {mapGetters} from 'vuex';

    export default {
        props: ['tree'],
        data() {
            return {
                editingQtUnit: false,
                qtUnitTyped:null,
                unitTyped:null,
                qtUnitValid:false
            }
        },
        computed: {
            ...mapGetters([Facet.PRIX, Facet.QT]),
            prixDefined() {
                return this.prix(this.tree)
            },
            qtUnitDefined() {
                return this.qt(this.tree)
            }
        },
        methods: {
            qtUnitInput(value){
                this.qtUnitTyped = parse(value);
            }
        }
    }
</script>