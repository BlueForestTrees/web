import Vue from 'vue'
import Do from "../../const/do";


export default {
    [Do.SET_TANK]: ({}, {tree, tank}) => {
        Vue.set(tree, "tank", tank);
    }
}