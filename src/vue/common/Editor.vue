<template>
    <div>
        <v-layout column>
            <v-list class="py-0">
                <v-list-tile v-if="field && !editing || idx === i" v-for="(field,i) in editor" :key="i" @click="toggle(i)">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <v-icon v-if="field.warning" color="red">warning</v-icon>
                            <span class="font-weight-bold">{{field.title}}</span>
                            <span :class="`font-weight-medium ml-3 ${changed(field) ? 'font-italic' : ''}`">{{displayValue(field)}}</span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="editable && !field.noedit">
                        <v-layout>
                            <v-btn v-if="editing" @click.stop="close" icon>
                                <v-icon color="primary">close</v-icon>
                            </v-btn>
                            <v-btn v-else @click.stop="goto(i)" icon>
                                <v-icon color="primary">edit</v-icon>
                            </v-btn>
                            <v-btn v-if="changed(field)" @click.stop="clear(field)" icon>
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-layout>
        <v-window v-model="idx" v-if="editing">
            <v-window-item lazy v-if="field" v-for="(field,i) in editor" transition="fade-transition" :key="i">
                <template v-if="field">
                    <component :is="field.editor" v-bind="field.props" :value="value(field)" @save="v => save(field, v)"/>
                </template>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import CloseEditBtn from "./CloseEditBtn"
    import {lowFirst} from "../../services/calculations"

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
            lowFirst,
            toggle(i) {
                if (this.editing) {
                    this.close()
                } else {
                    this.goto(i)
                }
            },
            changed(field) {
                return this.changes.hasOwnProperty(field.key)
            },
            value(field) {
                return this.changes.hasOwnProperty(field.key) ? this.changes[field.key] : this.initial[field.key]
            },
            displayValue(field) {
                return field.displayFct ?
                    field.displayFct(this.value(field)) || '...'
                    :
                    this.value(field) || '...'
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
            },
            clear(field) {
                this.save(field, undefined)
            }
        }
    }
</script>

<style scoped>

</style>