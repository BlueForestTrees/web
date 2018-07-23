import chai from 'chai';
import {applyCoef, buildAxises, updateRatios, separate} from "../../main/services/axis";
import {withNameIdQtGrandeur} from "../testPlumbing";
import {init} from "../setup";
import api from "../../../../src"; import ENV from "../../../../src/env"; import {cols} from "../../../../src/const/collections";

chai.should();

describe('Axis calculations', function () {

    beforeEach(init(api, ENV, cols));

    it('minimal buildAxises', function () {
        const tree = {
            trunk: withNameIdQtGrandeur("Skate", "a", 1, "kg"),
            facets: {
                items: []
            },
            tank: {
                items: []
            },
            impactsTank: {
                items: []
            }
        };
        const expected = [
            {
                "tree": "Skate",
                "name": "Quantité",
                "_qt": 1,
                "qt": 1,
                "baseQt": 1000,
                "_baseQt": 1000,
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
            impactsTank: {
                items: [withNameIdQtGrandeur("co2", "d", 3, "kg"), withNameIdQtGrandeur("poison", "e", 4, "L")]
            }
        };
        const expected = [
            {
                "grandeur": "Mass",
                "name": "Quantité",
                "_qt": 1,
                "qt": 1,
                "baseQt": 1000,
                "_baseQt": 1000,
                "tree": "Skate",
                "type": "trunk",
                "unit": "kg",
            },
            {
                "grandeur": "Mass",
                "name": "vitamine",
                "_qt": 1,
                "qt": 1,
                "baseQt": 1,
                "_baseQt": 1,
                "tree": "Skate",
                "type": "facet",
                "unit": "g",
            },
            {
                "grandeur": "Mass",
                "name": "voutamine",
                "_qt": 7,
                "qt": 7,
                "baseQt": 7,
                "_baseQt": 7,
                "tree": "Skate",
                "type": "facet",
                "unit": "g",
            },
            {
                "grandeur": "Volu",
                "name": "eau",
                "_qt": 3,
                "qt": 3,
                "baseQt": 0.003,
                "_baseQt": 0.003,
                "tree": "Skate",
                "type": "tank",
                "unit": "L",
            },
            {
                "grandeur": "Volu",
                "name": "elec",
                "_qt": 2,
                "qt": 2,
                "_baseQt": 0.002,
                "baseQt": 0.002,
                "tree": "Skate",
                "type": "tank",
                "unit": "L",
            },
            {
                "grandeur": "Mass",
                "name": "co2",
                "_qt": 3,
                "qt": 3,
                "_baseQt": 3000,
                "baseQt": 3000,
                "tree": "Skate",
                "type": "impactsTank",
                "unit": "kg"
            },
            {
                "grandeur": "Volu",
                "name": "poison",
                "_qt": 4,
                "qt": 4,
                "_baseQt": 0.004,
                "baseQt": 0.004,
                "tree": "Skate",
                "type": "impactsTank",
                "unit": "L",
            }
        ];
        buildAxises(tree).should.be.deep.equal(expected);
    });
    it('applyCoef', function () {
        const axises = [
            {tree: "leftTreeName", type: "facet", name: "Prix", _qt: 20, unit: "€", _baseQt: 4},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _qt: 20, unit: "l", _baseQt: 6},
            {tree: "leftTreeName", type: "tank", name: "Eau", _qt: 5, unit: "mol", _baseQt: 8},
            {tree: "leftTreeName", type: "tank", name: "Elec", _qt: 12, unit: "mol", _baseQt: 10},
        ];
        const coef = 2;
        const expected = [
            {tree: "leftTreeName", type: "facet", name: "Prix", qt: 40, _qt: 20, unit: "€", _baseQt: 4, baseQt: 8},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 40, _qt: 20, unit: "l", _baseQt: 6, baseQt: 12},
            {tree: "leftTreeName", type: "tank", name: "Eau", qt: 10, _qt: 5, unit: "mol", _baseQt: 8, baseQt: 16},
            {tree: "leftTreeName", type: "tank", name: "Elec", qt: 24, _qt: 12, unit: "mol", _baseQt: 10, baseQt: 20},
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
    it('updateRatios', function () {
        const axises = {
            common: {
            left: [
                {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 60, unit: "sec", baseQt: 60 * 1},
                {tree: "leftTreeName", type: "facet", name: "Prix", qt: 60, unit: "sec", baseQt: 60 * 1},
                {tree: "leftTreeName", type: "tank", name: "Elec", qt: 12, unit: "mol", baseQt: 12 * 1},
                {tree: "leftTreeName", type: "tank", name: "Eau", qt: 5.5, unit: "h", baseQt: 5.5 * 60 * 60}
            ],
            right: [
                {tree: "rightTreeName", type: "trunk", name: "Quantité", qt: 1, unit: "min", baseQt: 1 * 60},
                {tree: "rightTreeName", type: "facet", name: "Prix", qt: 30, unit: "sec", baseQt: 30 * 1},
                {tree: "rightTreeName", type: "tank", name: "Elec", qt: 24000, unit: "mmol", baseQt: 24000 * 0.001},
                {tree: "rightTreeName", type: "tank", name: "Eau", qt: 330, unit: "min", baseQt: 330 * 60}
            ]
            }
        };

        const expected = {
            common: {
                left: [
                    {tree: "leftTreeName", type: "trunk", name: "Quantité", qt: 60, unit: "sec", ratio: 1, "baseQt": 60},
                    {tree: "leftTreeName", type: "facet", name: "Prix", qt: 60, unit: "sec", ratio: 1, "baseQt": 60},
                    {tree: "leftTreeName", type: "tank", name: "Elec", qt: 12, unit: "mol", ratio: 0.5, "baseQt": 12},
                    {tree: "leftTreeName", type: "tank", name: "Eau", qt: 5.5, unit: "h", ratio: 1, "baseQt": 19800}
                ],
                right: [
                    {tree: "rightTreeName", type: "trunk", name: "Quantité", qt: 1, unit: "min", ratio: 1, "baseQt": 60},
                    {tree: "rightTreeName", type: "facet", name: "Prix", qt: 30, unit: "sec", ratio: 0.5, "baseQt": 30},
                    {tree: "rightTreeName", type: "tank", name: "Elec", qt: 24000, unit: "mmol", ratio: 1, "baseQt": 24},
                    {tree: "rightTreeName", type: "tank", name: "Eau", qt: 330, unit: "min", ratio: 1, "baseQt": 19800}
                ]
            }
        };

        updateRatios(axises).should.deep.equal(expected);
    });


});