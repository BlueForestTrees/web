import Vue from 'vue'
import App from './components/App'
import store from './store/store'
import Vuetify from 'vuetify'

Vue.use(Vuetify);


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    components: {App},
    template: '<App/>'
});