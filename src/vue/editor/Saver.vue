<template>
    <div>
        <v-container>
            <v-layout column align-center>
                <v-layout>
                    <v-btn :disabled="!canSaveOwn" color="primary" @click="saveOrUpdate">Enregistrer</v-btn>
                    <!--<v-btn v-if="canSaveCopy" color="primary" @click="save">Enregistrer une copie</v-btn>-->
                    <!--<v-btn v-if="canDelete" icon @click="remove">-->
                    <!--<v-icon color="grey">delete</v-icon>-->
                    <!--</v-btn>-->
                </v-layout>
                <!--<div v-if="canBrowseToViewPage">Accès à l'{{infoType[info.type]}}:-->
                <!--<router-link :to="{name:GO.INFO, params:{path:info.path}}">{{url}}</router-link>-->
                <!--</div>-->
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import {createStringObjectId} from "../../services/calculations"
    import {mapState, mapActions} from "vuex"
    import On from "../../const/on"

    export default {
        name: 'saver',
        props: {
            changes: Object,
            allowSave: {type: Boolean, default: true},
            path: {type: String, default: null},
            saveAction: String,
            updateAction: String,
            deleteAction: String,
            updatedText: String
        },
        methods: {
            ...mapActions({
                snack: On.SNACKBAR
            }),
            saveOrUpdate() {
                if (this.changes._id) {
                    this.update()
                } else {
                    this.save()
                }
            },
            save() {
                // const _id = createStringObjectId()
                // return this.$store.dispatch(this.saveAction, {...this.changes, _id}).then(() => {
                //     this.changes._id = _id
                //     this.emitSaved(this.changes)
                //     // this.$router.push({name: this.$route.name, params: {path: this.info.path}})
                // }).catch(e => {
                //     console.error(e)
                //     this.snack({text: e.body.message, color: "red"})
                // })
            },
            update() {
                this.$store.dispatch(this.updateAction, this.changes)
                    .then(() => {
                        this.emitSaved(this.changes)
                        this.snack({text: this.updatedText, color: "green"})
                        // this.$router.push({name: this.$route.name, params: {path: this.info.path}})
                    }).catch(() => this.snack({text: "Erreur à l'enregistrement", color: "orange"}))
            },
            emitSaved(changes) {
                this.$emit('saved', changes)
            },
            // remove() {
            //     this.$store.dispatch(this.deleteAction, this.changes._id)
            //         .then(deleted => deleted && this.$emit('deleted'))
            // },
        },
        computed: {
            ...mapState(['user']),
            canSave() {
                return this.allowSave && this.changed
            },
            canSaveOwn() {
                return this.canSave && this.owned
            },
            owned() {
                return this.user &&
                    (
                        this.changes._id === this.user._id
                        ||
                        this.changes.oid === this.user._id
                    )
            },
            // canSaveCopy() {
            //     return this.canSave && this.changes._id
            // },
            // canDelete() {
            //     return this.changes && this.changes._id
            // },
            // canBrowseToViewPage() {
            //     return this.url && !this.canSave
            // },
            // url() {
            //     return `${Vue.http.options.root}/${this.path}`
            // },
            changed() {
                for (let prop in this.changes) {
                    if (prop !== "_id" && this.changes.hasOwnProperty(prop)) {
                        return true
                    }
                }
                return false
            }
        },
    }
</script>