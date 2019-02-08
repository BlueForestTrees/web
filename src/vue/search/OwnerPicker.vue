<template>
    <v-menu v-model="menuVisible" :close-on-content-click="false" :min-width="menuMinWidth">
        <div slot="activator" class="font-weight-thin caption mx-2">
            <v-layout row align-center>
                <span v-if="title" class="font-weight-medium">{{title}}</span>
                <span v-else>tout le monde</span>
                <v-icon>arrow_drop_down</v-icon>
            </v-layout>
        </div>
        <v-card>
            <v-layout column>


                <v-layout :column="$vuetify.breakpoint.xsOnly" class="grey lighten-5" pa-2 align-center>
                    <v-layout row ml-3 align-center>
                        <a @click="select(null)" class="no-wrap mx-2">tout le monde</a>
                        <a v-if="user" @click="select(user)" class="no-wrap mx-2">moi</a>
                    </v-layout>
                </v-layout>

                <v-divider/>

                <v-layout align-center>
                    <v-text-field placeholder="Nom" autofocus @input="termChange" clearable class="chars-width-8 mx-5 mb-4" hide-details/>
                </v-layout>

                <loader v-if="loading" class="my-4"/>
                <span v-else-if="!items"></span>
                <span v-else-if="!items.length" class="my-4 align font-weight-thin bold-font">Pas de résultats :(</span>

                <v-layout v-else column wrap ma-2 :style="itemsStyle">
                    <a v-for="item in items" @click="select(item)" :key="'o'+item._id" class="list-complete-item">
                        <v-layout row align-center>
                            <v-icon :style="'color: '+item.color">stop</v-icon>
                            <a style="padding-right:0.5em">{{item.fullname}}</a>
                        </v-layout>
                    </a>
                </v-layout>

            </v-layout>

        </v-card>
    </v-menu>
</template>

<script>
    import Loader from "../loader/Loader"
    import {mapState, mapActions} from "vuex"
    import MenuPicker from "./MenuPicker"
    import On from "../../const/on"
    import debounce from 'lodash.debounce'

    export default {
        name: "owner-picker",
        components: {Loader},
        mixins: [MenuPicker],
        props: ['value'],
        data: () => ({items: null}),
        computed: {
            ...mapState({user: s => s.user, search: s => s.search}),
            title() {
                return this.value && this.value.fullname
            }
        },
        methods: {
            ...mapActions({searchUsers: On.SEARCH_USERS}),
            select(item) {
                this.$emit("input", item)
                this.menuVisible = false
            },
            termChange(term) {
                this.items = null
                this.loading = true
                if (term) {
                    this.searchTerm(term)
                } else {
                    this.loading = false
                }
            },
            searchTerm: debounce(function (term) {
                this.searchUsers({term})
                    .then(users => this.items = users)
                    .then(() => this.loading = false)
            }, 300)
        }
    }
</script>