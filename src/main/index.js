import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import api from "./rest/api"
import {initUnits} from "unit-manip"
import store from "./store/store"
import router from "./router/router"
import css from "./css/style.css"

Vue.config.productionTip = false
Vue.use(Vuetify, {
    theme: {
        primary: "1565c0"
    }
})

Promise
    .all([
        api.getGrandeurs()
            .then(initUnits)
    ])
    .then(startApp)

function startApp() {

    new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
    })
}
