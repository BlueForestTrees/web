<template>
    <panel title="Propriétaire" @close="$emit('close')">
        <v-icon slot="left" class="mx-3 mt-3" color="primary" large style="align-items:normal">people</v-icon>
        <a v-if="value" @click="select(null)">{{value.fullname}}</a>
        <v-layout v-else column>
            <v-container pt-0>
                <v-layout align-center>
                    <v-text-field placeholder="Recherche" autofocus @input="termChange" clearable hide-details></v-text-field>
                </v-layout>
            </v-container>

            <v-layout column wrap ma-2>
                <a @click="select(user)">
                    <v-layout row align-center>
                        <badge :user="user"/>
                        <a style="padding-right:0.5em">Moi</a>
                    </v-layout>
                </a>
                <a v-for="item in items" @click="select(item)" :key="'o'+item._id">
                    <v-layout row align-center>
                        <badge :user="item"/>
                        <a style="padding-right:0.5em">{{item.fullname}}</a>
                    </v-layout>
                </a>
            </v-layout>

            <loader v-if="loading"/>
            <span v-else-if="!items"></span>
            <span v-else-if="items && !items.length" class="align font-weight-thin bold-font ma-3">Rien trouvé :(</span>
        </v-layout>
    </panel>

</template>

<script>
    import Loader from "../loader/Loader"
    import {mapState, mapActions} from "vuex"
    import On from "../../const/on"
    import debounce from 'lodash.debounce'
    import Panel from "./Panel"
    import Badge from "../user/Badge"
    import Icon from "../common/icon"

    export default {
        name: "owner-panel",
        components: {Icon, Badge, Panel, Loader},
        props: ['value'],
        data: () => ({
            items: null,
            loading: false
        }),
        computed: {
            ...mapState({
                user: s => s.user
            })
        },
        methods: {
            ...mapActions({searchUsers: On.SEARCH_USERS}),
            select(item) {
                this.$emit("input", item)
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