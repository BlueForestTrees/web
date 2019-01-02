<template>
    <span class="ma-1">

        <template v-if="user">
            <v-list two-lines v-if="items.length">
                <template v-for="item in items">
                    <v-list-tile :key="item._id" avatar @click="goSelection(item)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ name(item) }}</v-list-tile-title>
                            <v-list-tile-sub-title>quantité: {{ qtFreqOrUnit(item) }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider/>
                </template>
            </v-list>
            <v-card-text v-else-if="loaded" class="text-md-center">
                <p>Vous n'avez pas de sélection.</p>
                <p>Vous pouvez enregistrer des selections de produits depuis la recherche et leur donner un nom.</p>
                <p>Vous pourrez ensuite les utiliser plus tard.</p>
            </v-card-text>
            <loader v-else/>
        </template>

        <v-container v-else>Connectez-vous pour voir vos sélections enregistrées.</v-container>

    </span>
</template>
<script>
    import On from "../../const/on"
    import Loader from "../loader/Loader"
    import {mapActions} from "vuex"
    import {qtFreqOrUnit, name} from "../../services/calculations"

    export default {
        name: "my-selects",
        components: {Loader},
        props: {user: Object},
        data: () => ({items: [], loaded: false, loading: false}),
        computed: {
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
        methods: {
            name, qtFreqOrUnit,
            ...mapActions({
                goSelection: On.GO_SELECTION,
                loadUserSelections: On.LOAD_SELECTION
            }),
            loadSelections() {
                this.loaded = false
                this.loading = true
                this.loadUserSelections(this.ownerFilter).then(items => {
                    this.items = items
                    this.loaded = true
                    this.loading = false
                }).catch(e => {
                    this.loaded = false
                    this.loading = false
                    console.error(e)
                })
            }
        },
        mounted() {
            this.loadSelections()
        }
    }
</script>