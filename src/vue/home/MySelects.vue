<template>
    <v-container>
        <template v-if="user">
            <v-card>
                <v-list two-lines v-if="items.length">
                    <template v-for="item in items">
                        <v-list-tile :key="item._id" avatar @click="select(item)">
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
            </v-card>
        </template>

        <v-container v-else>Connectez-vous pour voir vos sélections enregistrées.</v-container>

    </v-container>
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
                loadUserSelections: On.LOAD_SELECTIONS
            }),
            loadSelections() {
                if (!this.ownerFilter) return
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
            },
            select(item) {
                this.$emit('select', item)
            }
        },
        mounted() {
            this.loadSelections()
        }
    }
</script>