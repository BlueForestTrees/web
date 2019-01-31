<template>
    <img v-if="img" :src="img" class="elevation-5"/>
    <v-layout v-else row justify-center>
        <div class="no-photo pa-5 mb-3 align">
            <v-icon color="orange" small>new_releases</v-icon>
            <div class="font-weight-thin">Pas de photo</div>
        </div>
    </v-layout>
</template>
<script>
    import VoteFor from "../messages/VoteFor"

    export default {
        name: "photo",
        components: {VoteFor},
        data: () => ({photomenu: false}),
        props: {trunk: Object, size: {default: '400'}},
        computed: {
            img() {
                if (this.trunk && this.trunk.photo) {
                    return this.trunk.photo.replace("[size]", this.size)
                }
            }
        }
    }
</script>