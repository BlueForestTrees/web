<template>
    <v-container>
        <owned/>
        <v-flex mt-3>
            <v-card>
                <open-message :section="temoignageSection"/>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import OpenMessage from "./OpenMessage"
    import {secs} from "../const/sections"

    export default {
        components: {OpenMessage, Owned},
        data(){
            return {
                temoignageSection : secs.TEMOIGNAGE
            }
        }
    }
</script>