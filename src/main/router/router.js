import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

const BlueForest = () => import('../vue/BlueForest')
const Login = () => import('../vue/Login')
const Inscription = () => import('../vue/Inscription')
const Confirmation = () => import('../vue/Confirmation')
const Root = () => import('../vue/tree/Root')
const Tree = () => import('../vue/tree/Tree.vue')
const Search = () => import('../vue/Search')
const Imports = () => import('../vue/Imports')
const ImpactEntries = () => import('../vue/ImpactEntries.vue')
const Home = () => import('../vue/Home')
const Basket = () => import('../vue/Basket')
const Compare = () => import('../vue/compare/Compare')

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