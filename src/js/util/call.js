export default function call(context, fct, ...initialParams) {
    return function () {
        let eventParams = Array.from(arguments);

        //c'est un observers jquery, on vire le premier param ('observers')
        if(arguments[0] && arguments[0].rnamespace !== undefined){
            eventParams = eventParams.slice(1);
        }

        return fct.apply(context, initialParams.concat(eventParams));
    }
}