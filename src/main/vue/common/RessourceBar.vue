<template>

    <v-container>
        <v-layout row wrap justify-center align-center id="ressource_stack">
            <template v-for="(item,i) in path">
                <v-flex>
                    <ressource-item :item="item"
                                    @configure="configure" @delete="$emit('delete')"
                                    @select="$emit('select',i,item)"
                                    @load="$emit('load', i, item)"
                                    :selectable="i>0"
                                    :forceSelect="i===path.length-1"/>
                </v-flex>
                <v-flex>
                    <v-icon large>keyboard_arrow_up</v-icon>
                </v-flex>
            </template>
        </v-layout>
    </v-container>

</template>

<script>
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import RessourceItem from "./RessourceItem";


    export default {
        components: {RessourceItem},
        name: 'ressource-bar',
        props: ['path'],
        methods: {
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            configure() {
                this.showDialog({dialog: Dial.CONFIGURE_ROOT});
            }
        }
    }
</script>

<style>
    #ressource_stack {
        flex-direction: column;
    }
</style>