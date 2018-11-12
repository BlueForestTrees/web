<template>
    <v-container>
        <v-flex mt-3>

            <owned :user="user"/>

            <my-puzzle :user="user"/>

            <my-team :user="user"/>

            <my-messages/>

        </v-flex>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import OpenMessage from "../common/OpenMessage"
    import MyPuzzle from "./MyPuzzle"
    import MyTeam from "./MyTeam"
    import MyMessages from "./MyMessage"
    import {mapState} from "vuex"


    export default {
        components: {MyMessages, MyTeam, MyPuzzle, OpenMessage, Owned},
        computed:{
            ...mapState(['user']),
        }
    }
</script>