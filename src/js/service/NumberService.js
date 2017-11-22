class NumberService {

    round = (number:number) => {
        let mul:number = 100;
        let result:number = 0;
        do{
            result = Math.round(number * mul) / mul;
            mul*=10;
        }while(!(result > 0));
        return result;
    };

}

export default new NumberService();