<template>
    <v-container>
        <v-card>
            <v-layout column align-center>
                <v-layout row align-center class="font-weight-medium pa-3">
                    <v-icon color="green" class="mr-2">info</v-icon>
                    <div>Aspect pris en compte: {{info.fragment.name}}</div>
                </v-layout>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center my-5>
                    <selection-link :selection="info.leftSelection"/>
                    <p class="bold-font align display-2 ma-4">=</p>
                    <selection-link :selection="info.rightSelection"/>
                </v-layout>
            </v-layout>
            <v-layout column align-center>
                <div style="white-space: pre-line" class="font-weight-thin mb-3 align">{{info.description}}</div>
                <OpenMessage :section="{title: `Discuter sur ${info.path}`, filter: {topicId:info._id, type: `eq.info`}}"/>
            </v-layout>
        </v-card>
        <v-container>

        </v-container>
    </v-container>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"
    import OpenMessage from "../common/OpenMessage"
    import {GO} from "../../const/go"
    import SelectionLink from "./Selection-Link"

    export default {
        name: "eq-show",
        components: {SelectionLink, OpenMessage},
        props: ['info'],
        data: () => ({GO}),
        methods: {
            qtUnitName
        }
    }
</script>