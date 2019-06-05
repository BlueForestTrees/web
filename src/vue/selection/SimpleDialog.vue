<template>
    <v-dialog :value="value" max-width="500px" persistent @input="emitVisible" @keydown.esc="close">
        <subpage-title sub :title="title">
            <v-icon slot="left" :class="`${icon} logo-petit`"/>
            <closer slot="right" v-if="!notClosable" @close="close"/>
        </subpage-title>
        <v-card>
            <slot/>
        </v-card>
    </v-dialog>
</template>

<script>
    import SelectionPicker from "../tree/SelectionPicker"
    import Closer from "../common/Closer"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "SimpleDialog",
        components: {SubpageTitle, Closer, SelectionPicker},
        props: {
            value: {type: Boolean},
            selection: {type: Object},
            notClosable: {defaut: false, type: Boolean},
            icon: {type: String},
            title: {type: String}
        },
        methods: {
            pick(selection) {
                this.$emit('pick', selection)
            },
            close() {
                this.emitVisible(false)
            },
            emitVisible(v) {
                this.$emit('input', v)
            }
        }
    }
</script>