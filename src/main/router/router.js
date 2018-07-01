import {GO} from "../const/go";
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const Connexion = {template: '<div>Connexion</div>'};
const Inscription = {template: '<div>Inscription</div>'};

export default new VueRouter({
    routes: [
        {path: GO.LOGIN, component: Connexion},
        {path: GO.SUSCRIBE, component: Inscription}
    ]
});