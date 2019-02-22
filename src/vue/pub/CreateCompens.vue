<template>
    <view-edit-save>

        <v-card slot="left">
            <subpage-title title="Compensation" iconClass="voice logo"/>
            <v-layout column align-center>
                <v-layout column align-center justify-center my-5>
                    <span class="font-weight-thin text-no-wrap display-1 ma-2 font-italic">En cours de construction...</span>
                </v-layout>
            </v-layout>
            <v-layout row align-center>
                <v-spacer/>
                <open-message no-text :section="{title: `Discuter sur ${info.path}`, text:info.description, filter: {topicId:info._id, type: `alt.info`}}"/>
            </v-layout>
        </v-card>

        <v-card slot="right">
            <subpage-title icon="edit" title="Modifier"/>
        </v-card>

        <info-saver slot="bottom" v-if="!editing" v-model="canSave" :info="info" @delete="info = createInfo()"/>

    </view-edit-save>
</template>
<script>
    import Card from "../common/Card"
    import Connected from "../mixin/Connected"
    import SubpageTitle from "../tree/SubpageTitle"
    import OpenMessage from "../common/OpenMessage"
    import ViewEditSave from "./ViewEditSave"
    import InfoSaver from "./InfoSaver"

    const createInfo = () => ({type: "com", path: "", text: null})

    export default {
        name: "create-compens",
        mixins: [Connected],
        components: {InfoSaver, ViewEditSave, OpenMessage, SubpageTitle, Card},
        data: () => ({info: createInfo(), canSave: false, editing: false})
    }
</script>