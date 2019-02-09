<template>
    <v-container>

        <v-layout row wrap justify-center align-center xs-4 mb-1>
            <v-list-tile-avatar class="megaphone logo my-3"></v-list-tile-avatar>
            <search-text :value="search.name" @input="pickName" class="not-too-large"/>
        </v-layout>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center>
            <owner-picker @input="pickOwner" :value="search.owner"/>
        </v-layout>

            <v-card v-if="items && items.length > 0" key="1" class="mt-3">
                <v-list two-line>
                    <template v-for="(info, i) in items">
                        <v-list-tile @click="$emit('select',info)" avatar :key="info._id">
                            <info-dense :info="info"/>
                        </v-list-tile>
                        <v-divider v-if="i + 1 < items.length" :key="i"></v-divider>
                    </template>
                </v-list>
            </v-card>
            <div v-else-if="items" class="font-weight-thin bold-font mt-5" key="2">Pas de résultats</div>
            <loader v-else-if="loading" class="mt-5" key="3"></loader>

    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import Info from "../pub/Info"
    import Loader from "../loader/Loader"
    import InfoDense from "./InfoDense"
    import debounce from 'lodash.debounce'
    import TransitionExpand from "../common/TransitionExpand"
    import SearchText from "../search/SearchText"
    import OwnerPicker from "../search/OwnerPicker"

    export default {
        name: "my-infos",
        components: {OwnerPicker, SearchText, TransitionExpand, InfoDense, Loader, Info},
        props: ['user'],
        data: () => ({
            items: [],
            loading: false,
            term: ""
        }),
        mounted() {
            this.refresh()
        },
        computed: {
            ...mapState({search: s => s.search}),
            uterm: {
                get() {
                    return this.term
                },
                set: debounce(function (v) {
                    this.term = v
                }, 400)
            },
            query() {
                return {
                    oid: (this.search.owner && this.search.owner._id) || null,
                    term: this.search.name || null
                }
            }
        },
        methods: {
            ...mapActions({
                searchInfos: On.SEARCH_INFO
            }),
            async refresh() {
                this.items = null
                this.loading = true
                this.items = await this.searchInfos(this.query)
                this.loading = false
            },
            pickName(name) {
                this.search.name = name
            },
            pickOwner(owner) {
                this.search.owner = owner
            },
        },
        watch: {
            query() {
                this.refresh()
            }
        }
    }
</script>