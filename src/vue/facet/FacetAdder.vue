<template>
    <v-container>
        <v-card>
            <v-container>
                <div class="display-1 font-weight-thin">Ajouter une propriété</div>
            </v-container>
            <facet-entries/>
        </v-card>
    </v-container>
</template>

<script>
    import FacetEntries from "./FacetEntries"
    export default {
        name: "facet-adder",
        components: {FacetEntries}
    }
</script>