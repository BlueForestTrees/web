import localforage from 'localforage';

const init = () => {
    const forage = {};
    const prepareItem = item => item.storeDate = new Date() && item;

    const trunkInstance = localforage.createInstance({name: "trunk"});

    forage.storeTrunk = trunk => prepareItem(trunk) && trunkInstance.setItem(trunk._id, trunk);
    forage.storeTrunks = trunks => {
        const date = new Date();
        for (let i = 0; i < trunks.length; i++) {
            const trunk = trunks[i];
            trunk.storeDate = date;
            trunkInstance.setItem(trunk._id, trunk);
        }
        return trunks;
    };
    forage.getTrunk = _id => trunkInstance.getItem(_id);

    return forage;
};

export const forage = init();