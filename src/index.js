import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import store from "./store/store"
import router from "./router/router"
import css from "./css/style.css"

Vue.config.productionTip = false
Vue.use(Vuetify, {
    theme: {
        primary: "#1565c0"
    }
})

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
