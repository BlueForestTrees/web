import RestServiceBase from "rest/RestServiceBase";

class AdminTreesRestService extends RestServiceBase{

    deleteAll(): Promise {
        return this.rest(
            {
                contentType: 'application/json',
                url: "adminapi/delete/all",
                type: 'GET'
            }
        );
    };

    listAll(): Promise {
        return this.rest(
                {
                    contentType: 'application/json',
                    url: "adminapi/list/all",
                    type: 'GET'
                }
        );
    };

}

export default new AdminTreesRestService();