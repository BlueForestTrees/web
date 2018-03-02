import initial from "./services/initialService";
import initUnits from "./rest/unitInitial";

import Vue from 'vue'
import App from './vue/App'
import store from './store/store'
import Vuetify from 'vuetify'
import _ from 'lodash';

Vue.config.productionTip = false;

Promise
    .all(initialCalls())
    .then(fetchInitials)
    .then(initVue);

function initialCalls() {
    return [
        initUnits()
    ];
}

function fetchInitials(datas) {
    _.forEach(datas, data => {
        Object.assign(initial.unitModel, data);
    });
}

function initVue() {
    Vue.use(Vuetify);

    new Vue({
        el: '#app',
        store,
        components: {App},
        template: '<App/>'
    });
}
