<template>
    <span>
        <v-container>
            <v-layout column>
                <v-list>
                    <v-list-tile v-if="field && !editing || idx === i" v-for="(field,i) in editor" :key="i">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <v-icon v-if="field.warning" color="red">warning</v-icon>
                                <span>{{field.title}}:</span>
                                <span :class="` font-weight-medium ml-3 ${changed(field) ? 'font-italic' : ''}`">{{displayValue(field)}}</span>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action v-if="editable && !field.noedit">
                            <close-edit-btn :editing="editing" @close="close" @edit="goto(i)"/>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-layout>
        <v-window v-model="idx" v-if="editing">
            <v-window-item lazy v-if="field" v-for="(field,i) in editor" transition="fade-transition" :key="i">
                <template v-if="field">
                    <component :is="field.editor" :value="value(field)" :params="field.params" @save="v => save(field, v)"/>
                </template>
            </v-window-item>
        </v-window>
        </v-container>
    </span>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import CloseEditBtn from "./CloseEditBtn"

    const TextareaEditor = () => import("../editor/TextAreaEditor")
    const TreeSelectionPicker = () => import("../tree/TreeSelectionPicker")
    const PathEditor = () => import ("../pub/PathEditor")
    const CommonFragmentPicker = () => import("../tree/CommonFragmentPicker")
    const InformationPicker = () => import("../pub/InformationPicker")

    export default {
        name: "editor",
        components: {CloseEditBtn, SubpageTitle, TextareaEditor, TreeSelectionPicker, PathEditor, CommonFragmentPicker, InformationPicker},
        props: {
            initial: Object,
            changes: Object,
            editor: Array,
            editable: {type: Boolean, default: true}
        },
        data: () => ({idx: null}),
        computed: {
            editing() {
                return this.idx !== null
            }
        },
        methods: {
            changed(field) {
                return this.changes.hasOwnProperty(field.key)
            },
            value(field) {
                return this.changes[field.key] || this.initial[field.key]
            },
            displayValue(field) {
                return field.displayFct ?
                    field.displayFct(this.value(field))
                    :
                    this.value(field)
            },
            goto(idx) {
                this.idx = idx
                this.emitEdit()
            },
            close() {
                this.idx = null
                this.emitEdit()
            },
            emitEdit() {
                this.$emit('input', this.idx !== null)
            },
            save(field, newvalue) {
                this.$emit('change', field, newvalue)
                this.close()
            }
        }
    }
</script>

<style scoped>

</style>