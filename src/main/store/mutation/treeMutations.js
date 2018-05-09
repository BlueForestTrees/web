import Do from "../../const/do";


export default {
    [Do.CLEAR_RESULTS]: state => {
        state.search.searchResults = [];
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.searchResults = null;
    },
}