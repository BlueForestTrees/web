import {mapActions} from "vuex"
import On from "../../const/on"

export default {
    props: ['path'],
    methods: {
        ...mapActions({
            getInfo: On.GET_INFO,
        }),
        async refresh() {
            if (this.path) {
                this.infoChanged(await this.getInfo({path: this.path}))
            }
        }
    },
    mounted() {
        this.refresh()
    },
    watch: {
        '$route'(to, from) {
            this.refresh()
        }
    }
}