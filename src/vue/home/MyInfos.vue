<template>
    <v-container>

        <div class="mb-3">
            <v-card>
                <v-container>
                    <v-layout :column="$vuetify.breakpoint.smAndDown" align-center>
                        <v-text-field v-model="uterm" hide-details placeholder="Contenant le terme"/>
                        <v-checkbox v-model="mines" label="Les miennes"/>
                    </v-layout>
                </v-container>
            </v-card>
        </div>

        <transition-group name="slide-fade">
            <v-card v-if="items && items.length > 0" key="1">
                <v-list two-line>
                    <template v-for="(info, i) in items">
                        <v-list-tile @click="$emit('select',info)" avatar :key="info._id">
                            <info-dense :info="info"/>
                        </v-list-tile>
                        <v-divider v-if="i + 1 < items.length" :key="i"></v-divider>
                    </template>
                </v-list>
            </v-card>
            <div v-else-if="items" class="font-weight-thin bold-font" key="2">Pas de résultats</div>
            <loader v-else-if="loading" class="mt-5" key="3"></loader>
        </transition-group>

    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Info from "../pub/Info"
    import Loader from "../loader/Loader"
    import InfoDense from "./InfoDense"
    import debounce from 'lodash.debounce'
    import TransitionExpand from "../common/TransitionExpand"

    export default {
        name: "my-infos",
        components: {TransitionExpand, InfoDense, Loader, Info},
        props: ['user'],
        data: () => ({
            items: [],
            loading: false,
            mines: true,
            term: ""
        }),
        mounted() {
            this.refresh()
        },
        computed: {
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
                    oid: (this.mines && this.user && this.user._id) || null,
                    term: this.term || null
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
            }
        },
        watch: {
            query() {
                this.refresh()
            }
        }
    }
</script>