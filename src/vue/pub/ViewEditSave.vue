<template>

    <v-container>
        <v-layout column>

            <v-layout :column="$vuetify.breakpoint.lgAndDown">

                <v-flex pa-2>
                    <slot name="left"/>
                </v-flex>

                <v-flex pa-2>
                    <slot name="right"/>
                </v-flex>

            </v-layout>

            <v-flex pa-2>
                <slot name="bottom"/>
            </v-flex>

        </v-layout>
    </v-container>

</template>

<script>
    export default {
        name: "view-edit-save"
    }
</script>