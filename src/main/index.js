import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import api from "./rest/api";
import {initUnits} from "trees-units"
import store from "./store/store";
import css from "../css/style.css";
import router from "./router/router"
import infiniteScroll from 'vue-infinite-scroll'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)
Vue.use(infiniteScroll);
Vue.config.productionTip = false;
Vue.use(Vuetify);

Promise
    .all([
        api.getGrandeurs()
            .then(initUnits)
    ])
    .then(startApp);

function startApp() {

    new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
    });
}
