import router from "../../router/router"
import On from "../../const/on"

export default {
    [On.NAV_PREVIOUS]: ({}) => router.go(-1)
}