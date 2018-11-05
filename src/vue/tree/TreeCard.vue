<template>
    <card>
        <v-container>
            <v-layout column>
                <v-layout row align-center>
                    <svg width="30%" height="30%" viewBox="-10 -10 20 20">
                        <circle cx="0" cy="0" r="8" :stroke="trunk && trunk.color || 0" fill="none"/>
                    </svg>
                    <v-flex>
                        <h1 class="display-3 align" v-html="qtUnit(trunk)"></h1>
                    </v-flex>
                </v-layout>
                <v-flex>
                    <H3 class="display-1 align" v-html="name(trunk)"></H3>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn-toggle v-model="detail" @change="v=>$emit('change',v)" class="full-width">
            <v-btn flat value="impact" block class="fill-height">
                environnement<!--<img src="/img/logo.svg"/>-->
            </v-btn>
            <v-btn flat value="root" block class="fill-height">
                ressources<!--<img src="/img/logo.svg"/>-->
            </v-btn>
            <v-btn flat value="facet" block class="fill-height">
                propriétés<!--<img src="/img/logo.svg"/>-->
            </v-btn>
        </v-btn-toggle>
    </card>
</template>

<script>
    import Card from "../common/Card"
    import {qtUnit, name} from "../../services/calculations"

    export default {
        name: "tree-card",
        components: {Card},
        props: {"tree": Object},
        data() {
            return {detail: null}
        },
        methods: {
            qtUnit, name
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>