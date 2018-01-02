<template>
    <v-menu offset-y style="width: 100%" ref="menu">

        <v-text-field ref="textfield" @input="termInputChanged" :value="search.term" slot="activator" light solo prepend-icon="search" placeholder="Recherche"/>

        <v-list v-if="search.results">
            <v-list-tile v-for="trunk in search.results" :key="trunk._id" @click="open(trunk)">
                <v-list-tile-avatar>
                    <v-icon>assignment</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ trunk.name }}</v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="allowCreate && hasResults"/>
            <v-list-tile v-if="allowCreate" @click="onCreateClick">
                <v-list-tile-avatar>
                    <v-icon>add</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Créer "{{search.term}}"...</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>

</template>

<script>
    import {Do, On} from "../../../store/keys";

    import {mapGetters, mapActions, mapMutations} from 'vuex';


    export default {
        name: "search",
        props: ['search'],
        methods: {
            ...mapActions({
                'termInputChanged': On.UPDATE_SEARCH_TERM,
                'open': On.OPEN_TREE
            }),
            ...mapMutations([Do.SHOW_TRUNK_DIALOG, Do.UPDATE_TRUNK_DIALOG_DATA, Do.CLEAR_SEARCH]),
            onCreateClick: function () {
                this.showTrunkDialog();
                this.updateTrunkDialogData({name: this.search.term});
                this.clearSearch();
            },
            focus() {
                this.$refs.textfield.focus();
                this.$refs.menu.isActive = true;
            }
        },
        computed: {
            ...mapGetters(['allowCreate', 'hasResults'])
        },
        mounted() {
            this.focus();
        }
    }
</script>