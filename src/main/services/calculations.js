import {map} from 'lodash';
import {bestQuantity} from "trees-units";


export const hasQuantity = e => e.quantity && e.quantity.qt && e.quantity.unit;
export const format = v => v < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10;
export const trunkyAll = items => map(items, trunky);
export const trunky = trunk => ({_id: trunk._id, trunk});
export const idQtFrom = item => ({_id: item._id, quantity: item.quantity});
export const qtUnit = quantity => {
    if (quantity) {
        if (quantity.qt && quantity.unit) {
            const best = bestQuantity(quantity);
            return `${best.qt}${best.unit !== 'count' ? best.unit : ''}`;
        } else {
            return (quantity.qt || "?") + (quantity.unit || "?");
        }
    } else {
        return "??";
    }
};
export const qtUnitName = item => `${qtUnit(item.quantity || item)} ${item.name}`;