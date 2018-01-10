<template>
    <v-navigation-drawer fixed app v-model="_drawer">
        <v-list dense>
            <template v-for="(item, i) in items">
                <v-list-tile @click="action(item.action)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {Do} from "../../const/do";
    import {mapMutations} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
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
        methods: {
            ...mapMutations({
                "showDialog": Do.SHOW_DIALOG
            }),
            action(name){
                this[name]();
            },
            showFacetEntityDialog(){
                this.showDialog(Dial.FACET_ENTITY);
            }
        },
        data: () => ({
            items: [
                {icon: 'done', text: 'Créer une caractéristique', action: 'showFacetEntityDialog'},
                {icon: 'settings', text: 'Paramètres'},
                {icon: 'chat_bubble', text: 'Faire un commentaire'},
                {icon: 'help', text: 'Help'}
            ]
        })
    }
</script>