import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import store from "./store/store"
import router from "./router/router"
import css from "./css/style.css"
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false
Vue.use(Vuetify, {
    theme: {
        primary: "#1565c0"
    }
})

Vue.use(AsyncComputed)

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
