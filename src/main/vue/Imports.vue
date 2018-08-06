<template>
    <span>
        <v-container fill-height fluid>
            <v-layout column>
                <h1>Import de catégories d'impact ADEME</h1>
                <upload :dispatch="importImpactEntryAdeme"></upload>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout column>
                <h1>Import Produits ADEME</h1>
                <upload :dispatch="importTrunkAdeme"></upload>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout column>
                <h1>Import d'impacts de produits ADEME</h1>
                <upload :dispatch="importImpactAdeme" accept=".csv"></upload>
            </v-layout>
        </v-container>
    </span>
</template>

<script>

    import {mapActions} from "vuex"
    import On from "../const/on"
    import Upload from "./common/Upload"

    export default {
        components: {Upload},
        methods: {
            ...mapActions({
                importTrunkAdeme: On.IMPORT_TRUNK_ADEME,
                importImpactAdeme: On.IMPORT_IMPACT_ADEME,
                importImpactEntryAdeme: On.IMPORT_IMPACT_ENTRY_ADEME
            }),
        }
    }
</script>