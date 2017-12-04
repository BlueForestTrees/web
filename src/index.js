const api = require('api');

(async () => {

        const ble = await api.create({name:"blé",qt:1,unit:'kg'});
        const farine = await api.create({name:"farine",qt:1,unit:'kg'});
        await api.link({trunkId:farine._id,rootId:ble._id,trunkQt:1,rootQt:1,unit:"kg"});
        await api.get(farine._id,3,'g');

        console.log(await api.purge());
})();