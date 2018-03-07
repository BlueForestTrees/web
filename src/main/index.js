import initial from "./services/initialService";
import initUnits from "./rest/unitInitial";

import Vue from 'vue'
import App from './vue/App'
import store from './store/store'
import Vuetify from 'vuetify'
import _ from 'lodash';
import colors from 'vuetify/es5/util/colors'

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
    Vue.use(Vuetify,{
        theme: {
            primary: colors.blue.darken1, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.indigo.base // #3F51B5
        }
    });

    new Vue({
        el: '#app',
        store,
        components: {App},
        template: '<App/>'
    });
}
