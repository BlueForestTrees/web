import * as Do from "../mutationKeys";

export default{
    [Do.CLEAR_RESULTS]: state => {
        state.results = [];
    },
    [Do.UPDATE_TERM]: (state, value) => {
        state.term = value;
    },
    [Do.UPDATE_RESULTS]: (state, value) => {
        state.results = value;
    },
    [Do.UPDATE_SEARCHING]: (state, value) => {
        state.searching = value;
    }
}