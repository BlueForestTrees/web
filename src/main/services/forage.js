import localforage from 'localforage'
const prepareItem = item => item.storeDate = new Date() && item
const trunkInstance = localforage.createInstance({name: "trunk"})
const tokenInstance = localforage.createInstance({name: "token"})

export default {
    storeTrunk: trunk => prepareItem(trunk) && trunkInstance.setItem(trunk._id, trunk),
    storeTrunks: trunks => {
        const date = new Date()
        for (let i = 0; i < trunks.length; i++) {
            const trunk = trunks[i]
            trunk.storeDate = date
            trunkInstance.setItem(trunk._id, trunk)
        }
        return trunks
    },
    getTrunk: _id => trunkInstance.getItem(_id),

    getAccessToken: () => tokenInstance.getItem("token"),
    clearAccessToken: () => tokenInstance.removeItem("token"),
    setAccessToken: token => tokenInstance.setItem("token", token)
}