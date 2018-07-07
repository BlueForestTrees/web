<template>
    <card>
        <span slot="content">
            <img style="width:20%;padding-top:1em;padding-left:1em;" src="img/logo.svg">
            {{token}}
        </span>


    </card>
</template>

<script>
    import Card from "./layout/Card";

    export default {
        name: 'confirmation',
        props: ['token'],
        components: {Card},
    }
</script>