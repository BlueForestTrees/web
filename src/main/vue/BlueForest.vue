<template>
    <span>
        <left-menu/>
        <bar/>

        <v-content>
            <transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-content>

        <snack :snack="snack"/>

        <add-facet-entry-dialog/>
        <add-impact-entry-dialog/>
        <add-trunk-dialog/>
        <add-ressource-dialog/>
        <add-impact-dialog/>
        <add-usage-dialog/>
        <add-facet-dialog/>

        <connect-to-continue-dialog/>

    </span>
</template>

<script>

    import LeftMenu from './layout/LeftMenu'
    import Bar from "./layout/Bar"
    import On from "../const/on"
    import {mapState} from 'vuex'
    import Tree from "./tree/Tree"
    import AddImpactDialog from "./dialog/AddImpactDialog"
    import AddUsageDialog from "./dialog/AddUsageDialog"
    import AddFacetDialog from "./dialog/AddFacetDialog"
    import AddRessourceDialog from "./dialog/AddRessourceDialog"
    import AddFacetEntryDialog from "./dialog/AddFacetEntryDialog"
    import AddTrunkDialog from "./dialog/AddTrunkDialog"
    import AddImpactEntryDialog from "./dialog/AddImpactEntryDialog"
    import Snack from "./layout/Snack"
    import ConnectToContinueDialog from "./dialog/ConnectToContinueDialog"
    import {GO} from "../const/go"

    export default {
        data() {
            return {
                transitionName: null,
                routes: Object.values(GO)
            }
        },
        computed: {
            ...mapState(['basket', 'snack'])
        },
        components: {
            ConnectToContinueDialog,
            Snack,
            AddImpactEntryDialog,
            AddTrunkDialog,
            AddFacetEntryDialog,
            AddRessourceDialog,
            AddFacetDialog,
            AddUsageDialog,
            AddImpactDialog,
            Tree,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP)
        },
        watch: {
            '$route'(to, from) {
                this.transitionName = this.routes.indexOf(to.name) - this.routes.indexOf(from.name) > 0 ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>