<template>
    <div>
        <v-container>
            <v-layout column align-center>
                <v-layout>
                    <v-btn v-if="canBrowseToViewPage" :to="route">Consulter</v-btn>
                    <v-btn :disabled="!canSaveOwn" color="primary" @click="saveOrUpdate">Enregistrer</v-btn>
                    <v-btn v-if="canSaveCopy" color="primary" @click="saveCopy">Enregistrer une copie</v-btn>
                    <v-btn v-if="canDelete" icon @click="remove"><v-icon color="grey">delete</v-icon></v-btn>
                </v-layout>
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
            initial: Object,
            changes: Object,
            final: Object,
            editor: Array,
            route: Object,
            saveAction: String,
            updateAction: String,
            deleteAction: String,
            updatedText: String,
            savedText: String,
            noCopy: {type: Boolean, default: false},
            noDelete: {type: Boolean, default: false}
        },
        methods: {
            ...mapActions({
                snack: On.SNACKBAR,
                snackError: On.SNACKERROR,
            }),
            saveOrUpdate() {
                if (this.updateMode) {
                    this.update()
                } else {
                    this.save()
                }
            },
            saveCopy() {
                const _id = createStringObjectId()
                return this.$store.dispatch(this.saveAction, {...this.final, _id})
                    .then(() => {
                        this.changes._id = _id
                        this.emitSaved(this.changes)
                    }).catch(this.snackError)
            },
            save() {
                const _id = createStringObjectId()
                return this.$store.dispatch(this.saveAction, {...this.changes, _id})
                    .then(() => {
                        this.changes._id = _id
                        this.emitSaved(this.changes)
                        this.snack({text: this.savedText, color: "green"})
                    }).catch(this.snackError)
            },
            update() {
                const _id = this.initial._id
                this.$store.dispatch(this.updateAction, {...this.changes, _id})
                    .then(() => {
                        this.emitSaved(this.changes)
                        this.snack({text: this.updatedText, color: "green"})
                    }).catch(this.snackError)
            },
            emitSaved(changes) {
                this.$emit('saved', changes)
            },
            remove() {
                this.$store.dispatch(this.deleteAction, this.initial._id)
                    .then(deleted => {
                        if (deleted) {
                            this.snack({text: "Supprimé", color: "green"})
                            this.$emit('deleted')
                        }
                    }).catch(this.snackError)
            },
        },
        computed: {
            ...mapState(['user']),
            updateMode() {
                return this.initial && this.initial._id
            },
            canSave() {
                return this.allRequiredFieldsAreValued && this.changed
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
                        ||
                        this.changes.oid === undefined
                    )
            },
            canSaveCopy() {
                return this.canSave && this.initial._id && !this.noCopy
            },
            canDelete() {
                return this.initial._id && !this.noDelete
            },
            canBrowseToViewPage() {
                return this.route && !this.canSave
            },
            changed() {
                for (let prop in this.changes) {
                    if (prop !== "_id" && this.changes.hasOwnProperty(prop)) {
                        return true
                    }
                }
                return false
            },
            allRequiredFieldsAreValued() {

                for (let i = 0; i < this.editor.length; i++) {

                    if (this.editor[i].noedit) {
                        break
                    }

                    const fieldValued = this.editor[i].optional || this.final.hasOwnProperty(this.editor[i].key)

                    if (!fieldValued) {
                        return false
                    }
                }

                return true
            }
        },
    }
</script>