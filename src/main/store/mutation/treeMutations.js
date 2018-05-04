import Do from "../../const/do";


export default {
    [Do.CLOSE_TREE]: (state) => {
        state.compareTo = null;
        state.tree = null;
    },
    [Do.CLOSE_COMPARE_TO]: state => {
        state.compareTo = null;
    },

    [Do.CLEAR_RESULTS]: state => {
        state.search.searchResults = [];
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.searchResults = null;
    },
}