<template>
    <v-menu offset-y style="width: 100%" ref="menu">

        <v-text-field ref="textfield" @input="termInputChanged" :value="data.term" slot="activator" light solo prepend-icon="search" placeholder="Recherche"/>

        <v-list v-if="data.results">
            <v-list-tile v-for="trunk in data.results" :key="trunk._id" @click="open(trunk)">
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
                <v-list-tile-title>Créer "{{data.term}}"...</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>

</template>

<script>
    import {Dial, Do, On} from "../../store/keys";

    import {mapGetters, mapActions, mapMutations} from 'vuex';


    export default {
        name: "lookup",
        props: ['data'],
        methods: {
            ...mapActions({
                'termInputChanged': On.UPDATE_SEARCH_TERM,
                'open': On.OPEN_TREE
            }),
            ...mapMutations([Do.SHOW_DIALOG, Do.UPDATE_DIALOG_DATA, Do.CLEAR_SEARCH]),
            onCreateClick: function () {
                this.showDialog(Dial.TRUNK);
                this.updateDialogData({dialog:Dial.TRUNK,data:{name: this.data.term}});
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