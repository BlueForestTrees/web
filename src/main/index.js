import Vue from 'vue'
import App from './vue/App'
import store from './store/store'
import Vuetify from 'vuetify'
import api from "./rest/api";
import {initUnits} from "trees-units"
import css from '../css/style.css'

Vue.config.productionTip = false;

Promise
    .all([
        api.grandeurs()
            .then(initUnits)
    ])
    .then(initVue);

function initVue() {
    Vue.use(Vuetify);

    new Vue({
        el: '#app',
        store,
        components: {App},
        template: '<App/>'
    });
}
