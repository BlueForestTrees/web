<template>
    <panel title="Genre" @close="$emit('close')">
        <div slot="left" class="type-panel logo ml-3 mt-3  mr-1"></div>
        <a v-if="value" @click="emitInput(null)">{{map(value)}}</a>
        <v-item-group v-else v-model="idx" active-class="line-hightlight">
            <v-item>
                <v-btn flat round slot-scope="{ active, toggle }" @click="toggle" class="text-none">
                    <v-list-tile-avatar class="trunk logo-petit"/>
                    <span>Produits & Services</span>
                </v-btn>
            </v-item>
            <v-item>
                <v-btn flat round slot-scope="{ active, toggle }" @click="toggle" class="text-none">
                    <v-list-tile-avatar class="game logo-petit"/>
                    <span>Jeux</span>
                </v-btn>
            </v-item>
            <v-item>
                <v-btn flat round slot-scope="{ active, toggle }" @click="toggle" class="text-none">
                    <v-list-tile-avatar class="voice logo-petit"/>
                    <span>Informations</span>
                </v-btn>
            </v-item>
        </v-item-group>
    </panel>
</template>

<script>
    import Panel from "./Panel"

    const types = ['trunk', 'game', 'info']
    export default {
        name: "TypePanel",
        components: {Panel},
        props: ['value'],
        data: function () {
            return {idx: types.indexOf(this.value)}
        },
        computed: {
            type() {
                return types[this.idx]
            }
        },
        watch: {
            type(v) {
                this.emitInput(v)
            }
        },
        methods: {
            emitInput(v) {
                this.$emit("input", v)
            },
            map(v){
                switch(v){
                    case 'trunk':
                        return "Produits & Services"
                    case 'game':
                        return "Jeux"
                    case 'info':
                        return "Informations"
                }
            }
        }
    }
</script>

<style scoped>

</style>