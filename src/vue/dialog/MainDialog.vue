<template>
    <v-dialog v-model="visible" fullscreen transition="dialog-bottom-transition" scrollable
              :overlay="false"
              @keydown.esc="$emit('esc')" @keydown.ctrl.enter="$emit('enter')"
    >
        <v-card>
            <v-toolbar dense card dark color="primary">
                <v-icon>{{icon}}</v-icon>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="visible = false" dark>
                    <v-icon large>clear</v-icon>
                </v-btn>
            </v-toolbar>
            <slot :data="data" ref="content"/>
            <v-spacer/>
            <v-card-actions v-if="!noaction">
                <v-btn block @click="$emit('enter', data)" large color="green">
                    <v-icon x-large color="white">check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Dialog from "../mixin/Dialog"

    export default {
        props: {dialog: String, title: String, icon: String, noaction: Boolean},
        mixins: [Dialog],
    }
</script>