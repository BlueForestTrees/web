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
                <v-card-title>Quelque soit votre âge, votre métier, vous avez sûrement un avis à partager au sujet de l'environnement?</v-card-title>
                <open-message :section="temoignageSection"/>
            </v-card>
        </v-flex>
        <v-flex mt-3>
            <explain-datas/>
        </v-flex>
    </v-container>
</template>

<script>
    import Owned from "./Owned"
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"
    import WhatIs from "./WhatIsBF"
    import ExplainDatas from "./ExplainDatas"

    export default {
        components: {ExplainDatas, WhatIs, OpenMessage, Owned},
        data() {
            return {
                temoignageSection: secs.TEMOIGNAGE
            }
        }
    }
</script>