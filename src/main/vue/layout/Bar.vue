<template>
    <v-toolbar app dark fixed clipped color="blue darken-3">

        <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="_drawer = !_drawer"/>
            <span class="hidden-xs-only">{{title}}</span>
        </v-toolbar-title>

        <div class="d-flex align-center" style="margin-left: auto">
            <v-btn icon large @click="showSearch">
                <v-icon>search</v-icon>
            </v-btn>
            <v-avatar size="32px" tile><img src="img/logo-rond.svg" alt="BlueForest"></v-avatar>
        </div>
    </v-toolbar>
</template>

<script>
    import Lookup from "../common/Lookup";
    import MainDialog from "../dialog/MainDialog";
    import {mapGetters} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
        components: {
            MainDialog,
            Lookup
        },
        props: ['drawer'],
        computed: {
            _drawer: {
                get: function () {
                    return this.drawer;
                },
                set: function (value) {
                    this.$emit('update:drawer', value);
                }
            },
            ...mapGetters(['title'])
        },
        methods: {
            showSearch: function () {
                this.showDialog({dialog: Dial.SEARCH});
            }
        }
    }
</script>