<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="term" class="font-weight-medium">{{term}}</span>
                <span v-else>Nom</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>
                <v-layout :column="$vuetify.breakpoint.xsOnly" class="grey lighten-5" pa-2 align-center>
                    <v-layout row ml-3 align-center>
                        <a @click="emitInput(null)" class="no-wrap mx-2">Tout</a>
                        <a v-if="term" @click="emitInput(term)" class="no-wrap mx-2">{{term}}</a>
                    </v-layout>
                </v-layout>
                <search-text :value="term" @input="emitInput" label="Entrez un nom"/>
            </v-layout>
        </v-card>
    </v-menu>
</template>

<script>
    import MenuPicker from "./MenuPicker"
    import SearchText from "./SearchText"

    export default {
        name: "term-picker",
        components: {SearchText},
        mixins: [MenuPicker],
        props: ['value'],
        data: function () {
            return {
                term: this.value
            }
        },
        methods: {
            emitInput(term) {
                this.term = term
                this.menuVisible = false
                this.$emit("input", this.term)
            }
        }
    }
</script>