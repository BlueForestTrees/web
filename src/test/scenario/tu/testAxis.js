import chai from 'chai';
import {applyCoef, buildAxises, insertRatios, separate} from "../../../main/services/axis";
import {withNameIdQtGrandeur} from "../../testPlumbing";
import {initUnits} from "trees-units"
import {loadUnitsData} from "../../../../../api/src/main/service/unit/grandeurService";

chai.should();

const init = async () => {
    initUnits(await loadUnitsData());
};

describe('Axis calculations', function () {

    beforeEach(init);

    it('minimal buildAxises', function () {
        const tree = {
            trunk: withNameIdQtGrandeur("Skate", "a", 1, "kg"),
            facets: {
                items: []
            },
            tank: {
                items: []
            },
            impacts: {
                items: []
            }
        };
        const expected = [
            {
                "tree": "Skate",
                "name": "Quantité",
                "_qt": 1,
                "qt": 1,
                "type": "trunk",
                "unit": "kg",
                "grandeur": "Mass"
            }
        ];
        buildAxises(tree).should.be.deep.equal(expected);
    });
    it('complete buildAxises', function () {
        const tree = {
            trunk: withNameIdQtGrandeur("Skate", "a", 1, "kg"),
            facets: {
                items: [withNameIdQtGrandeur("vitamine", "b", 1, "g"), withNameIdQtGrandeur("voutamine", "d", 7, "g")]
            },
            tank: {
                items: [withNameIdQtGrandeur("eau", "b", 3, "L"), withNameIdQtGrandeur("elec", "c", 2, "L")]
            },
            impacts: {
                items: [withNameIdQtGrandeur("co2", "d", 3, "kg"), withNameIdQtGrandeur("poison", "e", 4, "L")]
            }
        };
        const expected = [
            {
                "grandeur": "Mass",
                "name": "Quantité",
                "_qt": 1,
                "qt": 1,
                "tree": "Skate",
                "type": "trunk",
                "unit": "kg",
            },
            {
                "grandeur": "Mass",
                "name": "vitamine",
                "_qt": 1,
                "qt": 1,
                "tree": "Skate",
                "type": "facet",
                "unit": "g",
            },
            {
                "grandeur": "Mass",
                "name": "voutamine",
                "_qt": 7,
                "qt": 7,
                "tree": "Skate",
                "type": "facet",
                "unit": "g",
            },
            {
                "grandeur": "Volu",
                "name": "eau",
                "_qt": 3,
                "qt": 3,
                "tree": "Skate",
                "type": "tank",
                "unit": "L",
            },
            {
                "grandeur": "Volu",
                "name": "elec",
                "_qt": 2,
                "qt": 2,
                "tree": "Skate",
                "type": "tank",
                "unit": "L",
            },
            {
                "grandeur": "Mass",
                "name": "co2",
                "_qt": 3,
                "qt": 3,
                "tree": "Skate",
                "type": "impacts",
                "unit": "kg"
            },
            {
                "grandeur": "Volu",
                "name": "poison",
                "_qt": 4,
                "qt": 4,
                "tree": "Skate",
                "type": "impacts",
                "unit": "L",
            }
        ];
        buildAxises(tree).should.be.deep.equal(expected);
    });
    it('applyCoef', function () {
        const axises = [
            {tree: "leftTreeName", type: "facet", name: "Prix", _qt: 20, unit: "€"},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _qt: 20, unit: "l"},
            {tree: "leftTreeName", type: "tank", name: "Eau", _qt: 5, unit: "mol"},
            {tree: "leftTreeName", type: "tank", name: "Elec", _qt: 12, unit: "mol"},
        ];
        const coef = 2;
        const expected = [
            {tree: "leftTreeName", type: "facet", name: "Prix", qt: 40, _qt: 20, unit: "€"},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 40, _qt: 20, unit: "l"},
            {tree: "leftTreeName", type: "tank", name: "Eau", qt: 10, _qt: 5, unit: "mol"},
            {tree: "leftTreeName", type: "tank", name: "Elec", qt: 24, _qt: 12, unit: "mol"},
        ];

        applyCoef(axises, coef).should.deep.equal(expected);

    });
    it('separate', function () {
        const leftAxises = [
            {tree: "leftTreeName", type: "trunk", name: "idem", _qt: 20, unit: "kg", grandeur: "Mass"},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _qt: 20, unit: "L", grandeur: "Volu"},
            {tree: "leftTreeName", type: "facet", name: "Prix", _qt: null, unit: null, grandeur: null},
            {tree: "leftTreeName", type: "tank", name: "Elec", _qt: 12, unit: "mol", grandeur: "Dens"},
            {tree: "leftTreeName", type: "tank", name: "Eau", _qt: 5, unit: "mol", grandeur: "Dens"}
        ];
        const rightAxises = [
            {tree: "rightTreeName", type: "trunk", name: "idem", _qt: 30, unit: "L", grandeur: "Volu"},
            {tree: "rightTreeName", type: "trunk", name: "Quantité", _qt: 30, unit: "L", grandeur: "Volu"},
            {tree: "rightTreeName", type: "facet", name: "Prix", _qt: 10, unit: "€", grandeur: "Prix"},
            {tree: "rightTreeName", type: "tank", name: "Elec", _qt: null, unit: null, grandeur: null},
            {tree: "rightTreeName", type: "tank", name: "Pétrole", _qt: 12, unit: "mol", grandeur: "Dens"}
        ];
        const expected = {
            left: [
                {tree: "leftTreeName", type: "facet", name: "Prix", _qt: null, unit: null, grandeur: null},
                {tree: "leftTreeName", type: "trunk", name: "idem", _qt: 20, unit: "kg", grandeur: "Mass"},
                {tree: "leftTreeName", type: "tank", name: "Elec", _qt: 12, unit: "mol", grandeur: "Dens"},
                {tree: "leftTreeName", type: "tank", name: "Eau", _qt: 5, unit: "mol", grandeur: "Dens"}
            ],
            common: {
                left: [
                    {tree: "leftTreeName", type: "trunk", name: "Quantité", _qt: 20, unit: "L", grandeur: "Volu"}
                ], right: [
                    {tree: "rightTreeName", type: "trunk", name: "Quantité", _qt: 30, unit: "L", grandeur: "Volu"}
                ]
            },
            right: [
                {tree: "rightTreeName", type: "tank", name: "Elec", _qt: null, unit: null, grandeur: null},
                {tree: "rightTreeName", type: "trunk", name: "idem", _qt: 30, unit: "L", grandeur: "Volu"},
                {tree: "rightTreeName", type: "facet", name: "Prix", _qt: 10, unit: "€", grandeur: "Prix"},
                {tree: "rightTreeName", type: "tank", name: "Pétrole", _qt: 12, unit: "mol", grandeur: "Dens"}
            ]
        };
        separate(leftAxises, rightAxises).should.deep.equal(expected);
    });
    it('insertRatio', function () {

        const fakeBaseQtFct = ({qt, unit}) => {
            if (qt === 60 || qt === 12 || qt === 30) {
                return qt;
            } else if (qt === 1) {
                return 1 * 60;
            } else if (qt === 5.5) {
                return 5.5 * 60 * 60;
            } else if (qt === 24000) {
                return 24000 * 0.001;
            } else if (qt === 330) {
                return 330 * 60;
            }
        };

        const common = {
            left: [
                {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 60, unit: "sec"},
                {tree: "leftTreeName", type: "facet", name: "Prix", qt: 60, unit: "sec"},
                {tree: "leftTreeName", type: "tank", name: "Elec", qt: 12, unit: "mol"},
                {tree: "leftTreeName", type: "tank", name: "Eau", qt: 5.5, unit: "h"}
            ],
            right: [
                {tree: "rightTreeName", type: "trunk", name: "Quantité", qt: 1, unit: "min"},
                {tree: "rightTreeName", type: "facet", name: "Prix", qt: 30, unit: "sec"},
                {tree: "rightTreeName", type: "tank", name: "Elec", qt: 24000, unit: "mmol"},
                {tree: "rightTreeName", type: "tank", name: "Eau", qt: 330, unit: "min"}
            ]
        };

        const expected = {
            left: [
                {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 60, unit: "sec", ratio: 1},
                {tree: "leftTreeName", type: "facet", name: "Prix", qt: 60, unit: "sec", ratio: 1},
                {tree: "leftTreeName", type: "tank", name: "Elec", qt: 12, unit: "mol", ratio: 0.5},
                {tree: "leftTreeName", type: "tank", name: "Eau", qt: 5.5, unit: "h", ratio: 1}
            ],
            right: [
                {tree: "rightTreeName", type: "trunk", name: "Quantité", qt: 1, unit: "min", ratio: 1},
                {tree: "rightTreeName", type: "facet", name: "Prix", qt: 30, unit: "sec", ratio: 0.5},
                {tree: "rightTreeName", type: "tank", name: "Elec", qt: 24000, unit: "mmol", ratio: 1},
                {tree: "rightTreeName", type: "tank", name: "Eau", qt: 330, unit: "min", ratio: 1}
            ]
        };

        insertRatios(common, fakeBaseQtFct).should.deep.equal(expected);
    });

    it('complete', function(){
        const rightTree = {

        } ;
    });

});