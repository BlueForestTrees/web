import units from './units'

export const applyQtCoef = (trunk, coef) => {
        trunk.qt *= coef;
        _.forEach(trunk.roots, root => {
            applyQtCoef(root, coef);
        });
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


export const toRadarData = (facetLeft, facetsRight) => {
    return [
        [
            {axis: "Prix", value: 1},
            {axis: "Quantité", value: 1},
            {axis: "Calories", value: 1},
            {axis: "Glucides", value: 1},
            {axis: "Fibres", value: 1}
        ],
        [
            {axis: "Prix", value: 0.22},
            {axis: "Quantité", value: 1},
            {axis: "Calories", value: 0.29},
            {axis: "Glucides", value: 0.17},
            {axis: "Fibres", value: 0.22}
        ]
    ];
}