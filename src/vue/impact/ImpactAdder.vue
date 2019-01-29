<template>
    <v-card>
        <v-container>
            <div class="display-1 font-weight-thin">Ajouter un impact</div>
        </v-container>
        <impact-entries/>
    </v-card>
</template>

<script>
    import ImpactEntries from "./ImpactEntries"
    export default {
        name: "impact-adder",
        components: {ImpactEntries}
    }
</script>