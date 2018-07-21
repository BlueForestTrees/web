import {GO} from "../const/go";
import Vue from 'vue'
import VueRouter from 'vue-router'
import BlueForest from '../vue/BlueForest'
import Login from '../vue/Login'
import Inscription from '../vue/Inscription'
import Confirmation from '../vue/Confirmation'

import Root from '../vue/tree/Root'

const Tree = () => import('../vue/tree/Tree.vue');
const Search = () => import('../vue/Search.vue');
import Home from '../vue/Home'
import Basket from '../vue/Basket'
import Compare from '../vue/compare/Compare'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {
            path: "/", component: BlueForest,
            children: [
                {
                    name: GO.HOME,
                    path: '',
                    component: Home,
                },
                {
                    name: GO.QTREE,
                    path: "tree/:qt/:unit/:_id",
                    component: Tree,
                    props:true
                },
                {
                    name: GO.TREE,
                    path: "tree/:_id",
                    component: Tree,
                    props:true
                },
                {
                    name: GO.ROOT,
                    path: "root/:treeId/:rootId",
                    component: Root,
                    props:true
                },
                {
                    name: GO.SEARCH,
                    path: "search",
                    component: Search
                },
                {
                    name: GO.BASKET,
                    path: "basket",
                    component: Basket
                },
                {
                    name: GO.COMPARE,
                    path: "compare/:leftId/:rightId",
                    component: Compare,
                    props: true
                }
            ]
        },
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true}
    ]
});