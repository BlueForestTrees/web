import _ from 'lodash';

export const hasQuantity = e => e.quantity && e.quantity.qt && e.quantity.unit;
export const format = v => v < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10;
export const trunkyAll = items => _.map(items, trunky);
export const trunky = trunk => ({_id: trunk._id, trunk});