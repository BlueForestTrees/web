<template>
    <v-list-tile :key="info._id" avatar>
        <slot name="left"></slot>
        <v-list-tile-content>
            <v-list-tile-title><router-link :to="{name:GO.INFO, params:{path:info.path}}">{{info.path}}</router-link></v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{info.leftSelection.name}} & {{info.rightSelection.name}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ infoType[info.type] }}, {{info.fragment.name}}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    import {GO} from "../../const/go"
    import {infoType} from "../../const/labels"

    export default {
        name: "info-tile",
        props: ["info"],
        data: () => ({
            GO,
            infoType
        })
    }
</script>