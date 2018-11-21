<template>
    <span>
        <messages v-if="nav.rightMenuVisible"/>
        <left-menu v-if="nav.leftMenuVisible"/>
        <bar/>
        <span v-if="dispo.grandeurs">

            <v-content>
                <transition :name="transitionName" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>

        </span>

        <snack :snack="snack" v-if="snack.visible"/>
        <connect-to-continue-dialog v-if="dialogs[Dial.CONNECT_TO_CONTINUE].visible"/>

    </span>
</template>


<script>
    import On from "../const/on"
    import {GO} from "../const/go"
    import {mapState} from 'vuex'
    import Bar from "./common/Bar"
    import {Dial} from "../const/dial"

    const Snack = () => import(/* webpackChunkName: "Snack" */ "./common/Snack")

    const ConnectToContinueDialog = () => import(/* webpackChunkName: "CTCDialog"*/ "./dialog/ConnectToContinueDialog")

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