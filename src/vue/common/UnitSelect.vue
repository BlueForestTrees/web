<template>
    <v-select
            item-text="name" required :solo="solo" :outline="outline"
            :items="items" :value="value" @input="v => $emit('input',v)" :rules="rules"
            return-object
    />
</template>

<script>
    export default {
        name: 'unit-select',
        props: ['value', 'grandeur', 'rules', 'solo', 'outline'],
        computed: {
            items: function () {
                if (this.grandeur && this.grandeur.units) {
                    return this.grandeur.units
                } else if (this.value) {
                    return [this.value]
                } else {
                    return []
                }
            }
        },
        watch: {
            grandeur: function (g) {
                if (g && g.key === "Nomb") {
                    this.$emit('input', this.grandeur.units[0])
                }
            }
        }
    }
</script>