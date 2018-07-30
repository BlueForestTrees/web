// import {shallowMount, createLocalVue} from '@vue/test-utils'
// import Compare from '../../main/vue/compare/Compare'
// import {init} from "../setup"
// import Vuex from 'vuex'
// import On from "../../main/const/on"
// import {expect} from 'chai'
//
// const localVue = createLocalVue()
//
// localVue.use(Vuex)
//
// const mockTree = (_id) => ({
//     left: {
//         _id: "LEFT",
//         name: "left tree"
//     }, right: {
//         _id: "RIGHT",
//         name: "right tree"
//     }
// })[_id]
//
// describe('Axis calculations', function () {
//
//     beforeEach(init)
//
//     it('test complet', function () {
//
//         const wrapper = shallowMount(Compare, {
//             localVue,
//             store: new Vuex.Store({
//                 state: {},
//                 actions: {
//                     [On.LOAD_OPEN_TREE]: ({}, {_id}) => mockTree(_id)
//                 }
//             }),
//             propsData: {
//                 leftId: 'left',
//                 rightId: 'right'
//             }
//         })
//
//         //wrapper.vm.$data.left
//
//     })
//
// })