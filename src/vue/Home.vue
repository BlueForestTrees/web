<template>
    <v-container>
        <what-is/>
        <v-flex mt-3>
            <owned/>
        </v-flex>
        <v-flex mt-3>
            <v-card>
                <v-card-title>Les témoignages</v-card-title>
                <v-divider/>
                <v-card-title>Quelque soit son âge, ou son métier, on a toujours une expérience à partager au sujet de l'environnement!</v-card-title>
                <open-message :section="temoignageSection"/>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import OpenMessage from "./OpenMessage"
    import {secs} from "../const/sections"
    import WhatIs from "./WhatIsBF"

    export default {
        components: {WhatIs, OpenMessage, Owned},
        data() {
            return {
                temoignageSection: secs.TEMOIGNAGE
            }
        }
    }
</script>