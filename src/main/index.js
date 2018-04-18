import scss from '../scss/style.scss';
import Vue from 'vue'
import App from './vue/App'
import store from './store/store'
import Vuetify from 'vuetify'
import rest from "./rest/routes";
import {initUnits} from "trees-units"

Vue.config.productionTip = false;

Promise
    .all([
        rest.grandeurs()
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
