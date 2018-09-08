<template>
<span>
        <span style="width: 100%">
            <v-card-title primary-title>
                <p style="padding-right:1em">Filtre</p>
                <v-text-field label="Nom" autofocus v-model="namePart"></v-text-field>
            </v-card-title>

            <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="blue">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{item.name}}
            </v-list-tile>

            <v-toolbar v-if="anySelected" app dark class="elevation-0" color="blue">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </v-toolbar-items>
                <v-spacer/>
                <v-tooltip bottom>
                    <v-btn slot="activator" v-if="oneSelected" flat dense @click="detailsDialog = true">Détails<v-icon>aspect_ratio</v-icon></v-btn>
                    <span style="pointer-events: none">Détails</span>
                </v-tooltip>
            </v-toolbar>
        </span>
        <add-impact-entries-btn/>

        <v-dialog v-model="detailsDialog" max-width="800">
          <v-card>
            <v-card-title class="headline">Détails de {{oneSelected.name}}</v-card-title>
              <v-divider/>
            <v-card-text>
              <v-list-tile v-for="(value, key) in oneSelected.raw" :key="key">
                  <p>{{key}}</p><v-spacer/><p>{{value}}</p>
              </v-list-tile>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" flat="flat" @click="detailsDialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </span>
</template>
<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import AddImpactEntriesBtn from "./layout/AddImpactEntriesBtn"

    export default {
        components: {AddImpactEntriesBtn},
        mixins: [selectable],
        data: function () {
            return {
                namePart: null,
                items: null,
                maxSelectionSize: 1,
                detailsDialog: false
            }
        },
        computed: {
            query: function () {
                return {
                    term: this.namePart || undefined
                }
            }
        },
        created: function () {
            this.namePart = ""
        },
        watch: {
            query: function (query) {
                this.dispatchSearch(query)
                    .then(items => this.items = items)
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_IMPACT_ENTRY,
            })
        }
    }
</script>