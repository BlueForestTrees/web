import rest from 'rest';

export default class RestServiceBase{

    rest(req:Object) {
        return rest(req.url);
    }


}