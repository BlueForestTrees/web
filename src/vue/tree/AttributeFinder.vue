<template>
    <div>
        <fragment-select v-model="viewDetail" class="pt-3"/>

        <v-window v-model="viewDetail" class="pt-1">
            <template v-for="fragment in fragments">
                <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                    <common-attribute :key="fragment.type" :trees="trees" :type="fragment.type" :fragment="fragment.type" :noItem="fragment.noItem" @select="i => $emit('select', i)"/>
                </v-window-item>
            </template>
        </v-window>
    </div>

</template>
<script>
    import Loader from "../loader/Loader"
    import {FACETS, IMPACT_TANK, TANK} from "../../const/fragments"
    import FragmentSelect from "./FragmentSelect"
    import CommonAttribute from "./CommonAttribute"

    export default {
        name: "attribute-finder",
        components: {CommonAttribute, FragmentSelect, Loader},
        props: ['trees'],
        data: () => ({
            currentSubPage: 0,
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
