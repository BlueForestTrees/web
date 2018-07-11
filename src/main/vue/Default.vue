<template>
    <span>
        <v-container fluid>
            <v-layout justify-center align-center column>
                <basket/>
            </v-layout>
        </v-container>
    </span>
</template>

<script>
    import Basket from "./layout/Basket";
    export default {
        components: {Basket}
    }
</script>