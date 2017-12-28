import units from './units'

export const applyQtCoef = (trunk, coef) => {
        trunk.qt *= coef;
        _.forEach(trunk.roots, root => {
            applyQtCoef(root, coef);
        });
    };

export const trunk = (value) => {
        if (!value)
            return null;

        let q, u, n;
        [, q, u, n] = value.match(/^(\d+[.,]?\d*)?(\S*)\s*(.*)?/);

        if (q && !units.lookup(u))
            return {name: value};

        if (!q && u) {
            n = n ? `${u} ${n}` : u;
            u = null;
        }

        return {
            qt: q ? q.replace(",", ".") : null,
            unit: u,
            name: n || null
        };
    };

const addAllSeeds = (trunk, tank) => {
    _.forEach(trunk.roots, seed => {
        if(_.isEmpty(seed.roots)){
            let tankEntry = tank[seed._id] || {_id:seed._id, name:seed.name, qt:0};
            tankEntry.qt += seed.qt;
            tank[seed._id] = tankEntry;
        }else{
            addAllSeeds(seed, tank);
        }
    });
    return tank;
};

export const tank = (trunk) => _.values(addAllSeeds(trunk,{}));