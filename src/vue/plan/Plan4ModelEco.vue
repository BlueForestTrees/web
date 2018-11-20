<template>
    <div id="m">
        <h1 class="display-3 font-weight-thin">Modèle économique</h1>

        <p>pim pam poum</p>
        <p>Les entreprises qui mettent leur produits sur la plateforme la subventionne dans un abonnement.</p>

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