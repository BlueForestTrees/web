<template>
    <v-menu v-if="dense" class="ma-3">
        <img slot="activator" :src="currentIcon" class="logo"/>
        <v-list>
            <template>
                <v-list-tile @click="emitInput(i)" v-for="(icon, i) in icons" :key="i">
                    <img :src="icon" class="logo"/>
                </v-list-tile>
            </template>
        </v-list>
    </v-menu>
    <v-item-group v-else :value="value" mandatory>
        <v-layout row>
            <template>
                <v-item v-for="(icon,i) in icons" :key="i">
                    <div slot-scope="{ active }">
                        <v-btn :input-value="active" icon @click="emitInput(i)">
                            <img :src="icon" class="logo"/>
                        </v-btn>
                    </div>
                </v-item>
            </template>
        </v-layout>
    </v-item-group>
</template>
<script>
    export default {
        name: "roots-menu",
        props: {value: {type: Number}, dense: {type: Boolean}},
        data: () => ({
            icons: ["/img/roots1.svg", "/img/roots2.svg", "/img/roots3.svg", "/img/branch1.svg"]
        }),
        computed: {
            currentIcon() {
                return this.icons[this.value]
            }
        },
        methods: {
            emitInput(idx) {
                console.log("emit input", idx)
                this.$emit('input', idx)
            }
        }
    }
</script>