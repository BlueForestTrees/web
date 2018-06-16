import On from "../../const/on";
import api from "../../rest/api";

export default {

    [On.SEND_FEEDBACK]: async ({}, {mail, message}) => api.sendFeedback({mail, message})
        .then(v => {
            if (v.n !== 1 || v.ok !== 1) {
                return Promise.reject(v);
            }
        })


}