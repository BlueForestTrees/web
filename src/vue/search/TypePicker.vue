<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="title" class="font-weight-medium">{{title}}</span>
                <span v-else>Genre</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>
                <v-layout :column="$vuetify.breakpoint.xsOnly" class="grey lighten-5" pa-2 align-center>
                    <v-layout row ml-3 align-center>
                        <a @click="emitInput(null)" class="no-wrap mx-2">Tout</a>
                        <a v-if="type" @click="emitInput(type)" class="no-wrap mx-2">{{title}}</a>
                    </v-layout>
                </v-layout>
                <v-list>
                    <v-list-tile key="t" avatar @click="emitInput('trunk')">
                        <v-list-tile-action>
                            <v-list-tile-avatar class="trunk logo-moyen"/>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Produits, Services</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile key="g" avatar @click="emitInput('game')">
                        <v-list-tile-action>
                            <v-list-tile-avatar class="game logo-moyen"/>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Jeux</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile key="i" avatar @click="emitInput('info')">
                        <v-list-tile-action>
                            <v-list-tile-avatar class="voice logo-moyen"/>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Informations</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-layout>
        </v-card>
    </v-menu>
</template>

<script>
    import MenuPicker from "./MenuPicker"

    export default {
        name: "TypePicker",
        props: ['value'],
        mixins: [MenuPicker],
        data() {
            return {
                type: this.value
            }
        },
        methods: {
            emitInput(type) {
                this.type = type
                this.menuVisible = false
                this.$emit("input", this.type)
            }
        },
        computed: {
            title() {
                switch (this.type) {
                    case "trunk":
                        return "Produits, Services"
                    case "game":
                        return "Jeux"
                    case "info":
                        return "Informations"
                }
            }
        }
    }
</script>