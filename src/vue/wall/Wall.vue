<template>
    <v-container class="mt-5">
        <welcome-panel class="mb-5"/>

        <v-container key="sp" py-0 px-1>
            <v-card>
                <SearchFilter/>
                <filters-panel/>
                <search-result-panel @select="goAny" key="sp"/>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
  import WelcomePanel from '../search/WelcomePanel'
  import SearchResultPanel from '../search/SearchResultPanel'

  import { mapActions } from 'vuex'
  import On from '../../const/on'
  import FiltersPanel from '../search/FiltersPanel'
  import SearchFilter from './SearchFilter'

  export default {
    name: 'wall',
    components: { SearchFilter, FiltersPanel, SearchResultPanel, WelcomePanel },
    methods: {
      ...mapActions({ goAny: On.GO_ANY }),
    },
  }
</script>