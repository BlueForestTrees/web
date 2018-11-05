<template>
    <v-container>
        <what-is/>
        <v-flex mt-3>
            <owned/>
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
    }
</script>