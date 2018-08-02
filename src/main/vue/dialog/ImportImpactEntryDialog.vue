<template>
    <main-dialog :dialog="Dial.IMPORT_IMPACT_ENTRY" title="Importer des catégories d'impact" ref="dialog"
                 @esc="close" noaction
    >
        <v-container fill-height fluid>
            <v-layout fill-height align-center>
                <v-flex><h1>Import de catégories d'impact</h1></v-flex>
                <v-flex>
                    <!--<file-upload :url='url' @change="onFileChange"-->
                                 <!--btn-label="Choisir un fichier" btn-label-progress="Envoi en cours.."-->
                    <!--&gt;</file-upload>-->
                </v-flex>
            </v-layout>
        </v-container>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog"
    import {Dial} from "../../const/dial"
    import closable from "../mixin/Closable"
    import {url} from "../../rest/rest"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        mixins: [closable],
        name: 'import-impact-entry-dialog',
        data() {
            return {
                Dial,
                url: url("/api/impactEntryBulk/ademe"),
            }
        },
        components: {
            MainDialog
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
        },
    }
</script>