<template>
    <v-flex>
        <form>
            <div class="dropbox">
                <input type="file" class="input-file" :accept="accept || '.xlsx'" @change="select">
                <p v-if="uploading">Traintement en cours...</p>
                <p v-else>Déposez votre fichier ici<br> ou cliquez pour parcourir</p>
            </div>
        </form>
        <template v-if="selectedFile && !uploading">
            <v-btn block flat outline color="primary" @click="upload">Importer : {{selectedFile.name}}, {{Math.ceil(selectedFile.size/1024)}}ko, {{new Date(selectedFile.lastModified).toLocaleDateString()}} {{new Date(selectedFile.lastModified).toLocaleTimeString()}}</v-btn>
        </template>
    </v-flex>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "upload",
        data() {
            return {
                selectedFile: null,
                uploading: null
            }
        },
        props: ['dispatch', 'accept'],
        methods: {
            ...mapActions({snack: On.SNACKBAR}),
            select(e) {
                this.selectedFile = e.target.files[0]
            },
            reset: function () {
                this.selectedFile = null
                this.uploading = false
            },
            upload() {
                this.uploading = true
                this.dispatch(this.selectedFile)
                    .then(res => {
                        this.uploading = false
                        console.log("RES", res)
                        if (res.ok) {
                            this.snack({
                                text: `
                                    ${res.matches > 0 ? (res.matches + " mises à jour") : ""}
                                    ${(res.matches > 0 && res.upsertions > 0) ? ", " : ""}
                                    ${res.upsertions > 0 ? (res.upsertions + " ajouts") : ""}
                                `
                            })
                            this.reset()
                        } else {
                            this.snack({text: "erreur pendant l'import: " + JSON.stringify(res)})
                        }
                    }).catch((err) => {
                    this.uploading = false
                    this.snack({text: err})
                })
            }
        }
    }
</script>

<style>
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }
</style>