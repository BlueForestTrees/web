<template>
    <v-btn-toggle v-model="detail" @change="v=>$emit('change',v)" class="full-width">
        <v-btn flat value="impact" block>
            <!--class="fill-height">-->
            environnement<!--<img src="/img/logo.svg"/>-->
        </v-btn>
        <v-btn flat value="root" block>
            <!--class="fill-height">-->
            ressources<!--<img src="/img/logo.svg"/>-->
        </v-btn>
        <v-btn flat value="facet" block>
            <!--class="fill-height">-->
            propriétés<!--<img src="/img/logo.svg"/>-->
        </v-btn>
    </v-btn-toggle>
</template>

<script>
    export default{
        name:'select-attribute-bar',
        data() {
            return {
                detail: null
            }
        },
    }
</script>