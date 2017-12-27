import * as Do from "../mutationKeys";
import * as On from "../actionKeys";
import trunks from "../../services/trunks";
import {DEBOUNCE_DELAY} from "../../services/const";
import _ from 'lodash';

export default {
    [On.TERM_CHANGE]: ({commit, dispatch}, term) => {
        commit(Do.UPDATE_TERM, term);
        commit(Do.UPDATE_SEARCHING, true);
        commit(Do.CLEAR_RESULTS);
        return dispatch(On.SEARCH, term);
    },
    [On.SEARCH]: //_.debounce(
        async function ({commit}, term) {
            commit(Do.UPDATE_RESULTS, await trunks.search(term));
            commit(Do.UPDATE_SEARCHING, false);
        }
       // },
        //DEBOUNCE_DELAY),
}