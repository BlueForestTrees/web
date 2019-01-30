<template>
    <v-menu v-if="dense">
        <v-btn slot="activator" flat icon :input-value="true">
            <img :src="currentIcon" class="logo ma-1"/>
        </v-btn>
        <v-card>
            <v-btn flat icon :input-value="i === value" @click="emitInput(i)" v-for="(icon, i) in scope" :key="i">
                <img :src="icon" class="logo" :style="{opacity: i === value ? 1 : 0.5}"/>
            </v-btn>
        </v-card>
    </v-menu>
    <div v-else>
        <v-btn flat icon :input-value="i === value" @click="emitInput(i)" v-for="(icon, i) in scope" :key="i">
            <img :src="icon" class="logo" :style="{opacity: i === value ? 1 : 0.5}"/>
        </v-btn>
    </div>
</template>
<script>
    import {rootScope} from "../../const/img"

    export default {
        name: "scope-menu",
        props: {value: {type: Number}, dense: {type: Boolean}, scope: {type: Array, default: () => rootScope}},
        computed: {
            currentIcon() {
                return this.scope[this.value]
            }
        },
        methods: {
            emitInput(idx) {
                this.$emit('input', idx)
            }
        }
    }
</script>