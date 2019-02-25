<template>
    <div class="pb-2">

        <info-menu :info="info"/>

        <slot/>

        <v-layout class="mr-3" justify-end>
            <note v-if="info.description" :text="info.description" />
        </v-layout>

    </div>
</template>

<script>
    import Note from "../common/Note"
    import InfoMenu from "./InfoMenu"

    export default {
        name: "info-base",
        components: {InfoMenu, Note},
        props: ['info']
    }
</script>