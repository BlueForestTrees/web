<template>
    <span>
        <ressources :tree="tree"/>
        <facets :tree="tree"/>
        <impacts :tree="tree"/>
        <branches :tree="tree"/>
    </span>
</template>

<script>
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Ressources from "./Ressources";
    import Impacts from "./Impacts";
    import BilanRessources from "./BilanRessources";

    export default {
        components: {
            BilanRessources,
            Impacts,
            Ressources,
            Branches,
            Facets
        },
        props: ['tree']
    }
</script>

<style>
    .item-card {
        margin-top: 1em;
    }
</style>