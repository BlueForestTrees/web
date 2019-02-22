<template>
    <v-flex class="scene">
        <div :class="cardClass">
            <v-layout column align-center justify-center class="card__face card__face--front">
                <slot name="front"></slot>
            </v-layout>
            <div class="card__face card__face--back">
                <slot name="back"></slot>
            </div>
        </div>
    </v-flex>
</template>

<script>
    export default {
        name: "card-3d",
        props: {flipped: {type: Boolean, default: false}},
        computed: {
            cardClass() {
                return {
                    card: true,
                    flipped: this.flipped
                }
            },
        }
    }
</script>