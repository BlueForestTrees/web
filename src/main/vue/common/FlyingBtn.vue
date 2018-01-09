<template>
    <v-icon v-if="this.state" :color="state.color" @mousedown.capture="$emit('mousedown')"
    @mouseover.capture="over" @mouseout.capture="out">{{state.icon}}</v-icon>
</template>
<script>

    import {Fly} from "../../const/fly";

    export default {
        props: ['fly'],
        computed: {
            state: {
                get() {
                    return this.states[this.fly];
                }
            }
        },
        data() {
            return {
                Fly:Fly,
                states: {
                    [Fly.NEAR]: {
                        color: "grey lighten-2", icon: "check_circle"
                    },
                    [Fly.OVER]: {
                        color: "grey lighten-1", icon: "check_circle"
                    },
                    [Fly.SELECTED]: {
                        color: "primary", icon: "check_circle"
                    },
                    [Fly.OTHER]: {
                        color: "grey lighten-2", icon: "panorama_fish_eye"
                    }
                }
            }
        },
        methods:{
            over(){
                console.log("over pin");
            },
            out(){
                console.log("out pin");
            }
        }
    }
</script>