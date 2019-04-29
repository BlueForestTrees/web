import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

const Wall = () => import(/* webpackChunkName: "Wall" */ "../vue/wall/Wall")
const NotFound = () => import(/* webpackChunkName: "NotFound" */ "../vue/NotFound")
const TreePage = () => import(/* webpackChunkName: "Tree" */ '../vue/tree/TreePage.vue')
const Equivalence = () => import(/* webpackChunkName: "Equivalence" */ '../vue/equivalence/Equivalence')
const Qui2 = () => import(/* webpackChunkName: "Qui2" */ '../vue/jeu/QuiDeuxFoisPlus')
const BlueForest = () => import(/* webpackChunkName: "BlueForest" */ '../vue/BlueForest')
const Compare = () => import(/* webpackChunkName: "Compare" */ '../vue/compare/Compare')
const Confirmation = () => import(/* webpackChunkName: "Confirmation" */ '../vue/user/Confirmation')
const Inscription = () => import(/* webpackChunkName: "Inscription" */ '../vue/user/Inscription')
const Login = () => import(/* webpackChunkName: "Login" */ '../vue/user/Login')
const Plan = () => import(/* webpackChunkName: "Plan" */ '../vue/plan/Plan')
const RoadMap = () => import(/* webpackChunkName: "RoadMap" */ '../vue/plan/RoadMap')
const BFCestQuoi = () => import(/* webpackChunkName: "BFCestQuoi" */ '../vue/plan/PlanIntro')
const CreateTree = () => import(/* webpackChunkName: "CreateTree" */ '../vue/tree/CreateTreePage')
const DatasExplained = () => import(/* webpackChunkName: "DatasExplained" */ '../vue/explain/DataExplained')
const MyTeam = () => import(/* webpackChunkName: "MyTeam" */ '../vue/home/MyTeam')
const MyMessages = () => import(/* webpackChunkName: "MyMessages" */ '../vue/home/MyMessage')
const AddImpactEntry = () => import(/* webpackChunkName: "AIE" */ '../vue/dialog/AddImpactEntry')
const AddFacetEntry = () => import(/* webpackChunkName: "AFEDialog" */ "../vue/dialog/AddFacetEntry")
const InfoPage = () => import(/* webpackChunkName: "Info"*/ "../vue/pub/InfoPage")
const CreateInfo = () => import(/* webpackChunkName: "Info"*/ "../vue/pub/CreateInfo")
const CreateEq = () => import(/* webpackChunkName: "CreateEq"*/ "../vue/pub/CreateEq")
const CreateCompens = () => import(/* webpackChunkName: "CreateCompens"*/ "../vue/pub/CreateCompens")
const CreateAlt = () => import(/* webpackChunkName: "CreateAlt"*/ "../vue/pub/CreateAlt")
const CreateGroup = () => import(/* webpackChunkName: "CreateGroup"*/ "../vue/pub/CreateGroup")
const RecentPage = () => import(/* webpackChunkName: "Recent"*/ "../vue/home/RecentPage")
const UserPage = () => import(/* webpackChunkName: "UserPage"*/ "../vue/user/UserPage")

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {
            path: "/", component: BlueForest,
            children: [
                {name: GO.SEARCH, path: "", component: Wall},
                {name: GO.PLAN_INTRO, path: "/aide", component: BFCestQuoi},
                {name: GO.PLAN, path: "/plan", component: Plan},
                {name: GO.TEAM, path: "/equipe", component: MyTeam},

                {name: GO.USER, path: "/user", component: UserPage},
                {name: GO.USER_ID, path: "/user/:_id", component: UserPage, props:true},

                {name: GO.MESSAGE, path: "/message", component: MyMessages},
                {name: GO.ROAD_MAP, path: 'roadmap', component: RoadMap},
                {name: GO.DATA_EXPLAINED, path: 'explain/datas', component: DatasExplained},
                {name: GO.CREATE_TREE, path: "new/tree", component: CreateTree},

                {name: GO.TREE, path: "tree/:bqt/:_id", component: TreePage, props: (route) => ({_id: route.params._id, bqt: Number(Number.parseFloat(route.params.bqt))})},
                {name: GO.TREE_EMPTY, path: "tree", component: TreePage},
                {name: GO.SELECTION, path: "sel/:_id", component: TreePage, props: (route) => ({sid: route.params._id})},

                {name: GO.EQUIV, path: "equiv/:bqt/:_id/:sbqt/:s_id", component: Equivalence, props: true},

                {name: GO.CREATE_INFO, path: "info", component: CreateInfo},

                {name: GO.INFO, path: "info/:path", component: InfoPage, props: true},

                {name: GO.EDIT_EQUIV, path: "eq/:path", component: CreateEq, props:true},
                {name: GO.EDIT_ALT, path: "alt/:path", component: CreateAlt, props: true},
                {name: GO.EDIT_GROUP, path: "g/:path", component: CreateGroup, props: true},

                {name: GO.EDIT_COMP, path: "co/:path", component: CreateCompens, props: true},


                {name: GO.GAME, path: "play/:gameId", component: Qui2, props: true},
                {name: GO.QUI_2, path: "qui2fois/:bqt/:_id/:f/:fid", component: Qui2, props: ({params}) => ({leftBqt: params.bqt, leftId: params._id, fragment: params.f, fragmentId: params.fid})},
                {name: GO.RECENT, path: "recent", component: RecentPage},
                {name: GO.COMPARE_EMPTY, path: "compare", component: Compare},
                {name: GO.COMPARE_PARTIAL, path: "compare/:leftId", component: Compare, props: true},
                {name: GO.ADD_IMPACT_ENTRY, path: "add/entry/impact", component: AddImpactEntry},
                {name: GO.ADD_FACET_ENTRY, path: "add/entry/facet", component: AddFacetEntry},
                {name: GO.COMPARE, path: "compare/:leftId/:rightId", component: Compare, props: true},
                {name: GO.NOT_FOUND, path: '/404', component: NotFound},
            ]
        },
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true},
        {path: '*', redirect: '/404'},
    ]
})
