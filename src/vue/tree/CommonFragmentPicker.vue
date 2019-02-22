<template>
    <div>
        <fragment-select v-model="idx" class="pt-3"/>
        <v-divider/>
        <v-window v-model="idx" class="pt-1">
            <template v-for="fragment in fragments">
                <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                    <common-attribute :key="fragment.type" :treesIds="params" :type="fragment.type" :fragment="fragment.type" :noItem="fragment.noItem" @select="v => $emit('save', v)"/>
                </v-window-item>
            </template>
        </v-window>
    </div>

</template>
<script>
    import Loader from "../loader/Loader"
    import {FACETS, IMPACT_TANK, IMPACTS, TANK} from "../../const/fragments"
    import FragmentSelect from "./FragmentSelect"
    import CommonAttribute from "./CommonAttribute"

    export default {
        name: "common-fragment-picker",
        components: {CommonAttribute, FragmentSelect, Loader},
        props: ['params'],
        data: () => ({
            idx: 0,
            commons: null,
            facetCommons: null,
            ressourceCommons: null,

            fragments: [
                {type: IMPACT_TANK, noItem: "Il n'y a pas d'information sur l'environnement commune à ces deux produits :(", loading: "analyse de l'environnement.."},
                {type: TANK, noItem: "Il n'y a pas d'information sur les ressources commune à ces deux produits :(", loading: "analyse des ressources.."},
                {type: FACETS, noItem: "Il n'y a pas d'information sur les propriétés commune à ces deux produits :(", loading: "analyse des propriétés.."},
            ]
        })
    }
</script>
