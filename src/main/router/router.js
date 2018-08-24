import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

//KO
import Tree from "../vue/tree/Tree"
//const Tree = () => import(/* webpackChunkName: "module-Tree" */ '../vue/tree/Tree.vue')
import Basket from "../vue/Basket"
//const Basket = () => import (/* webpackChunkName: "module-Basket" */ '../vue/Basket')
import Imports from "../vue/Imports"
//const Imports = () => import(/* webpackChunkName: "module-Imports" */ '../vue/Imports')

//?
const Root = () => import(/* webpackChunkName: "module-Root" */ '../vue/tree/Root')

//OK
const BlueForest = () => import(/* webpackChunkName: "module-BF" */ '../vue/BlueForest')
const Confirmation = () => import(/* webpackChunkName: "module-Confirmation" */ '../vue/Confirmation')
const Inscription = () => import(/* webpackChunkName: "module-Inscription" */ '../vue/Inscription')
const Login = () => import(/* webpackChunkName: "module-Login" */ '../vue/Login')
const Search = () => import(/* webpackChunkName: "module-Search" */ '../vue/Search')
const ImpactEntries = () => import(/* webpackChunkName: "module-ImpactEntries" */ '../vue/ImpactEntries')
const Home = () => import(/* webpackChunkName: "module-Home" */ '../vue/Home')
const Compare = () => import(/* webpackChunkName: "module-Compare" */ '../vue/compare/Compare')

Vue.use(VueRouter)

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
                    name: GO.TREE,
                    path: "tree/:bqt/:_id",
                    component: Tree,
                    props: true
                },
                {
                    name: GO.ROOT,
                    path: "root/:treeId/:rootId",
                    component: Root,
                    props: true
                },
                {
                    name: GO.SEARCH,
                    path: "search",
                    component: Search
                },
                {
                    name: GO.IMPACT_ENTRY,
                    path: "impactEntries",
                    component: ImpactEntries
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
                },
                {
                    name: GO.BULK_TRUNK,
                    path: "imports",
                    component: Imports,
                    props: true
                }
            ]
        },
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true}
    ]
})
