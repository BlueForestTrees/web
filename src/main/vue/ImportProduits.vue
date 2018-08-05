<template>
    <v-container fill-height fluid>
        <v-layout column>
            <v-flex><h1>Import Produits</h1></v-flex>
            <v-flex>
                <file-upload :url='importTrunkUrl' @change="onFileChange" :headers="{[X_ACCESS_TOKEN]: this.token}" btn-label="Choisir un fichier" btn-label-progress="Envoi en cours.."></file-upload>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions} from "vuex"
    import On from "../const/on"
    import {url} from "../rest/rest"
    import {X_ACCESS_TOKEN} from "../const/headers"
    import {mapState} from "vuex"

    export default {
        data() {
            return {
                importTrunkUrl: url("/api/trunkBulk/ademe"),
                X_ACCESS_TOKEN
            }
        },
        computed: {
            ...mapState(['token']),
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