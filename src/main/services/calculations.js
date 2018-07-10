import {map} from 'lodash';
import {bestQuantity} from "trees-units";


export const hasQuantity = e => e && e.quantity && e.quantity.qt && e.quantity.unit;
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
            return (quantity.qt || "?") + (quantity.unit || " ?");
        }
    } else {
        return "??";
    }
};
export const qtUnitName = item => `${qtUnit(item.quantity || item)} ${item && item.name || '?'}`;

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getLuma = value => {
    const c = value.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const overcolor = c => getLuma(c) < 120 ? "white" : "black";

export const initiales = fullname => {
    const nameSplit = fullname.toUpperCase().split(' ');
    if (nameSplit.length === 1) {
        return nameSplit[0] ? nameSplit[0].charAt(0):'?';
    } else {
        return nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
};