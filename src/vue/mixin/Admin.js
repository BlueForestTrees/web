import {mapActions} from "vuex"
import On from "../../const/on"
import Connected from "./Connected"

export default {
    data() {
        return {ok: false}
    },
    created() {
        this.checkAdmin().then(v => this.ok = v)
    },
    methods: {
        ...mapActions({checkAdmin: On.CHECK_ADMIN})
    }
}