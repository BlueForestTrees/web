<template>
    <div id="m">
        <h1 class="display-3 font-weight-thin">Modèle économique</h1>

        Pim, Pam, Poum

        <open-message :section="secs.MODEL_ECO"/>
    </div>
</template>

<script>
    import {secs} from "../../const/sections"
    import OpenMessage from "../common/OpenMessage"

    export default {
        name: "plan-model-eco",
        components: {OpenMessage},
        data:()=>({secs}),
    }
</script>