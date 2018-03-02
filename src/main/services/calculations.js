import _ from 'lodash';

export const hasQuantity = e => e.quantity && e.quantity.qt && e.quantity.unit;
export const format = v => v < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10;
export const trunkyAll = items => _.map(items, trunky);
export const trunky = trunk => ({_id: trunk._id, trunk});


//CLONE
const precisionRound = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};
export const bestRound = v =>
    v < 1 ? precisionRound(v,3)
        :
        v < 10 ? precisionRound(v,2)
            :
            v < 100 ? precisionRound(v,1)
                :
                Math.round(v);