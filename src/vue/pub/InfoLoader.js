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
                if (this.path !== 'new') {
                    const info = await this.getInfo({path: this.path})
                    if (info) {
                        this.setInitial(info)
                    } else {
                        this.setInitial({path: this.path})
                    }
                }
            }
        }
    },
    created() {
        this.refresh()
    },
    watch: {
        '$route'(to, from) {
            this.refresh()
        }
    }
}