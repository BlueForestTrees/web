import {GO} from "../const/go";
import Vue from 'vue'
import VueRouter from 'vue-router'
import BlueForest from '../vue/BlueForest'
import Login from '../vue/Login'
import Inscription from '../vue/Inscription'
import Confirmation from '../vue/Confirmation'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {name: GO.ROOT, path: "/", component: BlueForest},
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true}
    ]
});