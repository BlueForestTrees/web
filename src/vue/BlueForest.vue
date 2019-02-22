<template>
    <v-content>
        <messages v-if="nav.rightMenuVisible"/>
        <left-menu v-if="nav.leftMenuVisible"/>
        <bar/>
        <span v-if="dispo.grandeurs">
            <transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
        </span>

        <snack :snack="snack" v-if="snack.visible"/>
        <connect-to-continue-dialog v-if="dialogs[Dial.CONNECT_TO_CONTINUE].visible"/>
        <add-ressource-dialog/>

    </v-content>
</template>


<script>
    import On from "../const/on"
    import {GO} from "../const/go"
    import {mapState} from 'vuex'
    import Bar from "./common/Bar"
    import {Dial} from "../const/dial"

    const Snack = () => import(/* webpackChunkName: "Snack" */ "./common/Snack")

    const ConnectToContinueDialog = () => import(/* webpackChunkName: "CTCDialog"*/ "./dialog/ConnectToContinueDialog")
    const AddRessourceDialog = () => import(/* webpackChunkName: "AddResDialog"*/ "./dialog/AddRessourceDialog")

    const LeftMenu = () => import(/* webpackChunkName: "LeftMenu" */ "./common/LeftMenu")
    const Messages = () => import(/* webpackChunkName: "Messages" */ "./messages/Messages")

    export default {
        data() {
            return {
                show: false,
                transitionName: null,
                routes: Object.values(GO),
                Dial
            }
        },
        computed: {
            ...mapState(['nav', 'basket', 'snack', 'dispo', 'dialogs'])
        },
        components: {
            Messages,
            ConnectToContinueDialog,
            Snack,
            Bar,
            AddRessourceDialog,
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