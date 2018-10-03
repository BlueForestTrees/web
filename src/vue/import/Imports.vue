<template>
    <v-flex>
        <v-container fluid>
            <v-layout column>
                <h1>Import de catégories d'impact ADEME</h1>
                <upload :dispatch="importImpactEntryAdeme"></upload>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-layout column>
                <h1>Import de catégories de Produits ADEME</h1>
                <upload :dispatch="importCategorieAdeme"></upload>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-layout column>
                <h1>Import Produits ADEME</h1>
                <upload :dispatch="importTrunkAdeme"></upload>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-layout column>
                <h1>Import d'impacts de produits ADEME</h1>
                <upload :dispatch="importImpactAdeme" accept=".csv"></upload>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>

    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Upload from "./Upload"
    import Connected from "../mixin/Connected"

    export default {
        components: {Upload},
        mixins: [Connected],
        methods: {
            ...mapActions({
                importTrunkAdeme: On.IMPORT_TRUNK_ADEME,
                importImpactAdeme: On.IMPORT_IMPACT_ADEME,
                importCategorieAdeme: On.IMPORT_CATEGORIE_ADEME,
                importImpactEntryAdeme: On.IMPORT_IMPACT_ENTRY_ADEME
            }),
        }
    }
</script>