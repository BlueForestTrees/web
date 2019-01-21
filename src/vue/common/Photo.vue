<template>
    <img v-if="img" :src="img" class="elevation-5"/>
    <v-layout v-else row justify-center>
        <v-menu v-model="photomenu" :close-on-content-click="false" offset-y>
            <div slot="activator" class="no-photo pa-5 mb-3 align">
                <br><v-icon color="orange" small>new_releases</v-icon>Proposer une photo
            </div>
            <v-card>
                <vote-for text="Voter pour: pouvoir proposer des photos?" feature="photo.propose.vote" @vote="photomenu=false"/>
            </v-card>
        </v-menu>
    </v-layout>
</template>
<script>
    import VoteFor from "../messages/VoteFor"
    export default {
        name: "photo",
        components: {VoteFor},
        data:()=>({photomenu:false}),
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