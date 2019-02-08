import {mapState} from "vuex"

export default {
    data: () => ({
        loading: false,
        menuVisible: false,
        stateKey: "menu.selection",
        items: []
    }),

    computed: {
        ...mapState({user: s => s.user}),
        menuMinWidth() {
            return this.$vuetify.breakpoint.xsOnly ? 300 : 550
        },
        itemsStyle() {
            return {
                'min-height': '150px', 'max-height': '200px',
                'overflow': this.$vuetify.breakpoint.xsOnly ? 'scroll' : ''
            }
        }
    }
}