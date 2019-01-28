<template>
    <div>
        <v-container>
            <v-layout column align-center>
                <v-layout>
                    <v-btn :disabled="!canSave" color="primary" @click="saveOrUpdate">Enregistrer</v-btn>
                    <v-btn v-if="canSaveCopy" color="primary" @click="save">Enregistrer une copie</v-btn>
                </v-layout>
                <div v-if="canBrowseToViewPage">Accès à l'{{infoType[info.type]}}:
                    <router-link :to="{name:GO.INFO, params:{path:info.path}}">{{url}}</router-link>
                </div>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import {createStringObjectId} from "../../services/calculations"
    import Vue from 'vue'
    import {infoType} from "../../const/labels"
    import {GO} from "../../const/go"

    export default {
        name: "info-saver",
        data: () => ({
            GO,
            infoType,
            initialPath: null
        }),
        props: {
            info: {type: Object}, value: {type: Boolean},
        },
        methods: {
            ...mapActions({
                saveInfo: On.SAVE_INFO,
                updateInfo: On.UPDATE_INFO,
                snack: On.SNACKBAR,
                getInfo: On.GET_INFO,
            }),
            saveOrUpdate() {
                if (this.info._id) {
                    this.update()
                } else {
                    this.save()
                }
            },
            save() {
                const _id = createStringObjectId()
                return this.saveInfo({...this.info, _id}).then(() => {
                    this.info._id = _id
                    this.emitSaved()
                    this.$router.push({name: this.$route.name, params: {path: this.info.path}})
                }).catch(e => {
                    console.error(e)
                    this.snack({text: e.body.message, color: "red"})
                })
            },
            update() {
                this.updateInfo(this.info).then(() => {
                    this.emitSaved()
                    this.$router.push({name: this.$route.name, params: {path: this.info.path}})
                })
            },
            emitSaved() {
                this.$emit('input', false)
            }
        },
        computed: {
            canBrowseToViewPage() {
                return this.url && !this.value
            },
            url() {
                return this.info && this.info.path && `${Vue.http.options.root}/info/${this.info.path}`
            },
            canSave() {
                return this.value && this.info.path
            },
            pathChanged() {
                return this.initialPath !== (this.info && this.info.path)
            },
            canSaveCopy() {
                return this.canSave && this.pathChanged && this.info._id
            },
        },
        watch: {
            info(i) {
                this.initialPath = i.path
            }
        }
    }
</script>
