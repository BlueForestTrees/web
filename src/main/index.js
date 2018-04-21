import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import api from "./rest/api";
import {initUnits} from "trees-units"
import store from "./store/store";

Vue.config.productionTip = false;
Vue.use(Vuetify);

Promise
    .all([
        api.grandeurs()
            .then(initUnits)
    ])
    .then(startApp);

function startApp() {

    new Vue({
        el: '#app',
        store,
        components: {App},
        template: '<App/>'
    });
}
