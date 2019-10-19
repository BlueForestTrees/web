<template>
    <v-list dense>
        <v-list-group v-model="showFilterList">
            <template slot="activator">
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-flex class="tree-filter logo-big"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Filtrer...</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
            <filters-bar @input="showPanel"/>
        </v-list-group>
    </v-list>
</template>
<script>
  import FiltersBar from '../search/FiltersBar'
  import Do from '../../const/do'
  import { mapMutations } from 'vuex'

  export default {
    name: 'SearchFilter',
    components: { FiltersBar },
    data: () => ({ showFilterList: false }),
    methods: {
      ...mapMutations({
        doShowPanel: Do.SHOW_SEARCH_PANEL,
      }),
      showPanel(panel) {
        this.showFilterList = false
        this.doShowPanel(panel)
      },
    },
  }
</script>