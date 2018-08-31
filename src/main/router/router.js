import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

//KO
import Tree from "../vue/tree/Tree"
//const Tree = () => import(/* webpackChunkName: "Tree" */ '../vue/tree/Tree.vue')
import Basket from "../vue/Basket"
//const Basket = () => import (/* webpackChunkName: "Basket" */ '../vue/Basket')
import Imports from "../vue/Imports"
//const Imports = () => import(/* webpackChunkName: "Imports" */ '../vue/Imports')
import Root from "../vue/tree/Root"
//const Root = () => import(/* webpackChunkName: "Root" */ '../vue/tree/Root')
import Home from "../vue/Home"
//const Home = () => import(/* webpackChunkName: "Home" */ '../vue/Home')

//OK
const BlueForest = () => import(/* webpackChunkName: "BF" */ '../vue/BlueForest')
const Confirmation = () => import(/* webpackChunkName: "Confirmation" */ '../vue/Confirmation')
const Inscription = () => import(/* webpackChunkName: "Inscription" */ '../vue/Inscription')
const Login = () => import(/* webpackChunkName: "Login" */ '../vue/Login')
const Search = () => import(/* webpackChunkName: "Search" */ '../vue/Search')
const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../vue/ImpactEntries')
const Compare = () => import(/* webpackChunkName: "Compare" */ '../vue/compare/Compare')

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
                    name: GO.TREE_EMPTY,
                    path: "tree",
                    component: Tree
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
                    name: GO.COMPARE_EMPTY,
                    path: "compare",
                    component: Compare
                },
                {
                    name: GO.COMPARE_PARTIAL,
                    path: "compare/:leftId",
                    component: Compare,
                    props: true
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
