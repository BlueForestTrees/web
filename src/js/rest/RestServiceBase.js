import call from "util/call";
import logger from "component/LogComponent";

export default class RestServiceBase{

    rest(options: any) {
        const that = this;
        return new Promise(function (resolve) {
            $.ajax(options)
                    .done(resolve)
                    .fail(call(that, RestServiceBase.ajaxCallFail, options.url));
        })
    }

    static ajaxCallFail(title: string, req) {
        try {
            logger.debug(title, JSON.stringify(JSON.parse(req.responseText), null, 1));
        } catch (e) {
            if (typeof req === 'object') {
                logger.debug(title, req.responseText);
            } else {
                logger.debug(title, req);
            }
        }
    };

}