<template>
    <v-menu v-if="info._id">

        <v-layout slot="activator" align-center class="pa-2">
            <span class="font-weight-medium font-italic">{{info.path}}</span>
            <v-icon>arrow_drop_down</v-icon>
        </v-layout>

        <v-list>
            <v-list-tile @click="edit(info)">
                <v-list-tile-avatar>
                    <v-icon color="primary">edit</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title><h3 class="font-weight-thin">Modifier...</h3></v-list-tile-title>
            </v-list-tile>
            <open-message list-tile :section="section"/>
        </v-list>

    </v-menu>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "info-menu",
        props:['info'],
        components: {OpenMessage},
        methods: {
            ...mapActions({edit:On.GO_EDIT_INFO})
        },
        computed: {
            section() {
                return {
                    title: `Messages sur ${this.info.path}`,
                    comment: this.info.description || 'aucun',
                    filter: {topicId: this.info._id, type: `eq.info`}
                }
            }
        }
    }
</script>