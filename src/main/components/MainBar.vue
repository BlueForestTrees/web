<template>
    <v-toolbar dark fixed app clipped color="blue darken-3">

        <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'"
                         class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="_drawer = !_drawer">
            </v-toolbar-side-icon>
            <span class="hidden-xs-only">BlueForest Trees</span>
        </v-toolbar-title>

        <search :search="search" @createDialog=""/>


        <div class="d-flex align-center" style="margin-left: auto">
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
                </v-avatar>
            </v-btn>
        </div>

    </v-toolbar>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import Search from "./Search";


    export default {
        components: {Search},
        name: 'main-bar',
        props: ['drawer'],
        computed: {
            ...mapState(['search']),
            ...mapGetters(['allowCreate']),
            _drawer: {
                get: function () {
                    return this.drawer;
                },
                set: function (value) {
                    this.$emit('update:drawer', value);
                }
            }
        }
    }
</script>