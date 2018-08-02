<template>
    <v-container fill-height fluid>
        <v-layout column>
            <v-flex><h1>Import Produits</h1></v-flex>
            <v-flex>
                <file-upload :url='importTrunkUrl' @change="onFileChange" btn-label="Choisir un fichier" btn-label-progress="Envoi en cours.."></file-upload>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions} from "vuex"
    import On from "../const/on"
    import {url} from "../rest/rest"

    export default {
        data() {
            return {
                importTrunkUrl: url("/api/trunkBulk/ademe"),
            }
        },
        methods: {
            ...mapActions({snack: On.SNACKBAR}),
            onFileChange(response) {
                if (response.ok) {
                    this.snack({
                        text: `
                        ${response.matches > 0 ? (response.matches + " mises à jour") : ""}
                        ${(response.matches > 0 && response.upsertions > 0) ? ", " : ""}
                        ${response.upsertions > 0 ? (response.upsertions + " ajouts") : ""}
                    `
                    })
                }
            }
        }
    }
</script>