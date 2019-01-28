<template>
    <v-list-tile-content v-if="info">
        <template v-if="info.type === 'eq'">
            <v-list-tile-title>
                <router-link :to="{name:GO.INFO, params:{path:info.path}}">{{info.path}}</router-link>
            </v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{info.leftSelection.name}} / {{info.rightSelection.name}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ infoType[info.type] }}, {{info.fragment.name}}</v-list-tile-sub-title>
        </template>
        <template v-else-if="info.type === 'alt'">
            <v-list-tile-title>
                <router-link :to="{name:GO.INFO, params:{path:info.path}}">{{info.path}}</router-link>
            </v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{info.leftSelection.name}} / {{info.rightSelection.name}} / {{info.equivSelection.name}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ infoType[info.type] }}, {{info.fragment.name}}</v-list-tile-sub-title>
        </template>
        <template v-else-if="info.type === 'gr'">
            <v-list-tile-title>
                <router-link :to="{name:GO.INFO, params:{path:info.path}}">{{info.path}}</router-link>
            </v-list-tile-title>
            <v-list-tile-sub-title>{{ infoType[info.type] }}</v-list-tile-sub-title>
        </template>

    </v-list-tile-content>
</template>

<script>
    import {GO} from "../../const/go"
    import {infoType} from "../../const/labels"

    export default {
        name: "info-dense",
        props: ["info"],
        data: () => ({
            GO,
            infoType
        })
    }
</script>