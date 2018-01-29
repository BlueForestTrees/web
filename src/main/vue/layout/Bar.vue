<template>
    <v-toolbar app dark fixed clipped color="blue darken-3">

        <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="_drawer = !_drawer">
            </v-toolbar-side-icon>
            <span class="hidden-xs-only">BlueForest Trees</span>
        </v-toolbar-title>

        <lookup @select="open" cancreate style="max-width: 500px; min-width: 128px"/>

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
    import Lookup from "../common/Lookup";
    import MainDialog from "../dialog/MainDialog";
    import {mapActions} from "vuex";
    import On from "../../const/on";

    export default {
        components: {
            MainDialog,
            Lookup},
        props: ['drawer'],
        computed: {
            _drawer: {
                get: function () {
                    return this.drawer;
                },
                set: function (value) {
                    this.$emit('update:drawer', value);
                }
            }
        },
        methods:{
            ...mapActions({
                open:On.LOAD_OPEN_TRUNK
            })
        }
    }
</script>