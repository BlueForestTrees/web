<template>
    <div class="scene">
        <div :class="cardClass">
            <div class="card__face card__face--front">
                <slot name="front"></slot>
            </div>
            <div class="card__face card__face--back">
                <slot name="back"></slot>
            </div>
        </div>
    </div>
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

<style>
    .scene {
        width:400px;
        height:280px;
        perspective: 600px;
    }

    .card {
        width: 100%;
        height: 100%;
        transition: transform 0.3s;
        transform-style: preserve-3d;
        cursor: pointer;
        position: relative;
    }

    .card.flipped {
        transform: rotateY(180deg);
    }

    .card__face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }

    .card__face--front {
    }

    .card__face--back {
        transform: rotateY(180deg);
    }

</style>