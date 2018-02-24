import _ from 'lodash';

export const hasQuantity = e => e.quantity && e.quantity.qt && e.quantity.unit;
export const format = v => v < 10 ? Math.floor(v * 100) / 100 : Math.floor(v * 10) / 10;
export const trunkyAll = items => _.map(items, trunky);
const trunky = trunk => ({_id: trunk._id, trunk});