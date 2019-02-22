<template>
    <span>
        <v-container>
            <v-layout column>
                <v-list>
                    <v-list-tile v-if="field && !editing || idx === i" v-for="(field,i) in fields" :key="i">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <v-icon v-if="field.warning" color="red">warning</v-icon>
                                <span>{{field.title}}:</span>
                                <span :class="` font-weight-medium ml-3 ${field.newvalue ? 'font-italic' : ''}`">{{field.displayFct ? field.displayFct(field.newvalue || field.value) : field.newvalue || field.value}}</span>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action v-if="editable && !field.noedit">
                            <close-edit-btn :editing="editing" @close="close" @edit="goto(i)"/>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-layout>
        </v-container>
        <v-window v-model="idx" v-if="editing">
            <v-window-item lazy v-if="field" v-for="(field,i) in fields" transition="fade-transition" :key="i">
                <template v-if="field">
                    <component :is="field.editor" :value="field.newvalue || field.value" :params="field.params" @save="v => save(field, v)"/>
                </template>
            </v-window-item>
        </v-window>
    </span>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import CloseEditBtn from "./CloseEditBtn"

    const TextareaEditor = () => import("../editor/TextAreaEditor")
    const TreeSelectionPicker = () => import("../tree/TreeSelectionPicker")
    const PathEditor = () => import ("../pub/PathEditor")
    const CommonFragmentPicker = () => import("../tree/CommonFragmentPicker")

    export default {
        name: "viewer-editor",
        components: {CloseEditBtn, SubpageTitle, TextareaEditor, TreeSelectionPicker, PathEditor, CommonFragmentPicker},
        props: {
            title: String,
            fields: Array,
            editable: {type: Boolean, default: true}
        },
        data: () => ({idx: null}),
        computed: {
            editing() {
                return this.idx !== null
            }
        },
        methods: {
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
            save(field, value) {
                field.newvalue = value
                this.$emit('change', field)
                this.close()
            }
        }
    }
</script>

<style scoped>

</style>