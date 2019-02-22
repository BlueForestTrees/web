import router from "../../router/router"
import On from "../../const/on"
import {GO} from "../../const/go"

export default {
    [On.NAV_PREVIOUS]: ({}) => router.go(-1),
    [On.GO_LOGIN]: ({}) => router.push({name: GO.LOGIN}),
}