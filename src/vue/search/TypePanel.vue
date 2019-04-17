<template>
    <panel title="Genre" @close="$emit('close')">
        <v-item-group v-model="idx" active-class="type-panel--active">
            <v-item>
                <v-btn flat round slot-scope="{ active, toggle }" @click="toggle" class="text-none">
                    <v-list-tile-avatar class="trunk logo-petit"/>
                    <span>Produits, Services</span>
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
                this.$emit("input", v)
            }
        }
    }
</script>

<style scoped>

</style>