<template>
    <v-container>
        <v-layout column align-center>
            <v-layout>
                <v-btn :disabled="!canSave || !owned" color="primary" @click="saveOrUpdate">Enregistrer</v-btn>
                <v-btn v-if="canSaveCopy" color="primary" @click="save">Enregistrer une copie</v-btn>
                <v-btn v-if="canDelete" icon @click="remove"><v-icon color="grey">delete</v-icon></v-btn>
            </v-layout>
            <div v-if="canBrowseToViewPage">Accès à l'{{infoType[info.type]}}:
                <router-link :to="{name:GO.INFO, params:{path:info.path}}">{{url}}</router-link>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapActions, mapState} from "vuex"
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
                deleteInfo: On.DELETE_INFO,
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
            },
            remove() {
                this.deleteInfo(this.info._id)
                    .then(deleted => deleted && this.$emit('delete'))
            }
        },
        computed: {
            ...mapState(['user']),
            canBrowseToViewPage() {
                return this.url && !this.value
            },
            url() {
                return this.info && this.info.path && `${Vue.http.options.root}/info/${this.info.path}`
            },
            canSave() {
                return this.value && this.info.path
            },
            owned() {
                return this.user && (this.info.oid ? this.info.oid === this.user._id : true)
            },
            pathChanged() {
                return this.initialPath !== (this.info && this.info.path)
            },
            canSaveCopy() {
                return this.canSave && this.pathChanged && this.info._id
            },
            canDelete() {
                return this.info && this.info._id
            }
        },
        watch: {
            info(i) {
                this.initialPath = i.path
            }
        }
    }
</script>
