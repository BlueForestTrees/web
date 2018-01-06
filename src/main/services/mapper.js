export const applyQtCoef = (trunk, coef) => {
    trunk.qt *= coef;
    _.forEach(trunk.roots, root => {
        applyQtCoef(root, coef);
    });
};

const addAllSeeds = (trunk, tank) => {
    _.forEach(trunk.roots, seed => {
        if (_.isEmpty(seed.roots)) {
            let tankEntry = tank[seed._id] || {_id: seed._id, name: seed.name, qt: 0};
            tankEntry.qt += seed.qt;
            tank[seed._id] = tankEntry;
        } else {
            addAllSeeds(seed, tank);
        }
    });
    return tank;
};

export const tank = (trunk) => _.values(addAllSeeds(trunk, {}));

const relativeTo1 = (first, second) => first > second ? 1 : first / second;

/**
 *
 * @param left = [
 {
    "qt": 20,
    "unit": "kg",
    "name": "pomme"
}
 ]
 * @param right = [
 {
    "qt": 10,
    "unit": "kg",
    "name": "pomme"
}
 ];
 * @returns  let sample = [
 [
 {axis: "Prix", value: 1, qtUnit:"20kg"},
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
 */
export const toRadarData = (left, right) => {

    if (!left || !right || !left.facets || !right.facets) {
        console.warn("rendu de radar sans data", left, right);
        return;
    }

    const leftFacets = left.facets;
    const rightFacets = right.facets;

    const leftNames = _.map(leftFacets, 'name');
    const rightNames = _.map(rightFacets, 'name');

    const commonNames = _.intersection(leftNames, rightNames);

    const leftAxes = _.map(commonNames, name => ({
        name, value: relativeTo1(_.find(leftFacets, {name}).qt, _.find(rightFacets, {name}).qt),
        qtUnit: _.find(leftFacets, {name}).qt + _.find(leftFacets, {name}).unit
    }));
    const rightAxes = _.map(commonNames, name => ({
        name, value: relativeTo1(_.find(rightFacets, {name}).qt, _.find(leftFacets, {name}).qt),
        qtUnit: _.find(rightFacets, {name}).qt + _.find(rightFacets, {name}).unit
    }));

    const leftOnly = _.difference(leftNames, rightNames);
    _.forEach(leftOnly, name => {
        leftAxes.push({
            name, value: 1,
            qtUnit: _.find(leftFacets, {name}).qt + _.find(leftFacets, {name}).unit
        });
        rightAxes.push({
            name, value: 0,
            qtUnit: 0 + _.find(leftFacets, {name}).unit
        });
    });

    const rightOnly = _.difference(rightNames, leftNames);
    _.forEach(rightOnly, name => {
        rightAxes.push({
            name, value: 1,
            qtUnit: _.find(rightFacets, {name}).qt + _.find(rightFacets, {name}).unit
        });
        leftAxes.push({
            name, value: 0,
            qtUnit: 0 + _.find(rightFacets, {name}).unit
        });
    });

    return [leftAxes, rightAxes];
};