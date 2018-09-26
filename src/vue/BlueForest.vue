<template>
    <span>
        <right-menu/>
        <left-menu/>
        <bar/>
        <span v-if="dispo.grandeurs">

            <v-content style="padding-top:56px">
                <transition :name="transitionName" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>

            <snack :snack="snack"/>

            <add-facet-entry-dialog/>
            <add-impact-entry-dialog/>
            <add-ressource-dialog/>
            <add-impact-dialog/>
            <add-facet-dialog/>
            <connect-to-continue-dialog/>

        </span>

    </span>
</template>


<script>
    import On from "../const/on"
    import {GO} from "../const/go"
    import {mapState} from 'vuex'

    import Bar from "./layout/Bar"
    import LeftMenu from './layout/LeftMenu'
    import RightMenu from "./layout/Messages"
    import Snack from "./layout/Snack"

    import AddImpactDialog from "./dialog/AddImpactDialog"
    import AddFacetDialog from "./dialog/AddFacetDialog"
    import AddRessourceDialog from "./dialog/AddRessourceDialog"
    import AddFacetEntryDialog from "./dialog/AddFacetEntryDialog"
    import AddImpactEntryDialog from "./dialog/AddImpactEntryDialog"
    import ConnectToContinueDialog from "./dialog/ConnectToContinueDialog"

    export default {
        data() {
            return {
                show:false,
                transitionName: null,
                routes: Object.values(GO)
            }
        },
        computed: {
            ...mapState(['basket', 'snack', 'dispo'])
        },
        components: {
            RightMenu,
            ConnectToContinueDialog,
            Snack,
            AddImpactEntryDialog,
            AddFacetEntryDialog,
            AddRessourceDialog,
            AddFacetDialog,
            AddImpactDialog,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            this.$store.dispatch(On.MOUNT_APP)
        },
        watch: {
            '$route'(to, from) {
                this.transitionName = this.routes.indexOf(to.name) - this.routes.indexOf(from.name) > 0 ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>