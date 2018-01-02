<template>
    <div>
        <trunk :tree="tree"/>
        <branches />
        <facets :tree="tree"/>
        <impacts/>
        <ressources/>
        <bilan-ressources/>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Impacts from "./Impacts";
    import BilanRessources from "./BilanRessources";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";

    export default {
        components: {
            Ressources,
            Trunk,
            BilanRessources,
            Impacts,
            Branches,
            Facets},
        name: 'tree',
        props: ['tree'],
        computed: {
            ...mapState(['search'])
        }
    }
</script>