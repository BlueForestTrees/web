<template>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="_dialog = !_dialog">
        <v-icon>add</v-icon>
    </v-btn>
</template>


<script>
    export default {
        name:'floating-bar',
        props: ['dialog'],
        computed: {
            _dialog: {
                get: function () {
                    return this.dialog;
                },
                set: function (value) {
                    this.$emit('update:dialog', value);
                }
            }
        }
    }
</script>