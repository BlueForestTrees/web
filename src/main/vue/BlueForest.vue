<template>
    <span>
        <left-menu/>
        <right-menu/>
        <bar/>

        <v-content style="padding-top:56px">
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
    import AddFacetDialog from "./dialog/AddFacetDialog"
    import AddRessourceDialog from "./dialog/AddRessourceDialog"
    import AddFacetEntryDialog from "./dialog/AddFacetEntryDialog"
    import AddTrunkDialog from "./dialog/AddTrunkDialog"
    import AddImpactEntryDialog from "./dialog/AddImpactEntryDialog"
    import Snack from "./layout/Snack"
    import ConnectToContinueDialog from "./dialog/ConnectToContinueDialog"
    import {GO} from "../const/go"
    import RightMenu from "./layout/RightMenu"

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
            RightMenu,
            ConnectToContinueDialog,
            Snack,
            AddImpactEntryDialog,
            AddTrunkDialog,
            AddFacetEntryDialog,
            AddRessourceDialog,
            AddFacetDialog,
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