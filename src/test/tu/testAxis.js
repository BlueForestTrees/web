import chai from 'chai'
import {applyCoef, buildAxises, updateRatios, separate} from "../../main/services/axis"
import {init, withNameIdBqtG} from "../setup"


chai.should()

describe('Axis calculations', function () {
    
    beforeEach(init)
    
    it('buildAxises', function () {
        const tree = {
            trunk: withNameIdBqtG("Skate", "a", 1000, "Mass"),
            facets: [withNameIdBqtG("vitamine", "b", 1, "Mass"), withNameIdBqtG("voutamine", "d", 7, "Mass")],
            tank: [withNameIdBqtG("eau", "b", 3, "Volu"), withNameIdBqtG("elec", "c", 2, "Volu")],
            impactsTank: [withNameIdBqtG("co2", "d", 3, "Mass"), withNameIdBqtG("poison", "e", 4, "Volu")]
        }
        const expected = [
            {
                "name": "vitamine",
                "_bqt": 1,
                bqt: 1,
                "tree": "Skate",
                "type": "facet",
                "g": "Mass",
            },
            {
                "name": "voutamine",
                "_bqt": 7,
                bqt: 7,
                "tree": "Skate",
                "type": "facet",
                "g": "Mass",
            },
            {
                "name": "eau",
                "_bqt": 3,
                bqt: 3,
                "tree": "Skate",
                "type": "tank",
                "g": "Volu",
            },
            {
                "name": "elec",
                "_bqt": 2,
                bqt: 2,
                "tree": "Skate",
                "type": "tank",
                "g": "Volu",
            },
            {
                "name": "co2",
                "_bqt": 3,
                bqt: 3,
                "tree": "Skate",
                "type": "impactsTank",
                "g": "Mass"
            },
            {
                "name": "poison",
                "_bqt": 4,
                bqt: 4,
                "tree": "Skate",
                "type": "impactsTank",
                "g": "Volu",
            }
        ]
        buildAxises(tree).should.be.deep.equal(expected)
    })
    
   
    it('separate', function () {
        const leftAxises = [
            {tree: "leftTreeName", type: "trunk", name: "idem", _bqt: 20, g: "Mass"},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _bqt: 20, g: "Volu"},
            {tree: "leftTreeName", type: "facet", name: "Prix", _bqt: null, g: null},
            {tree: "leftTreeName", type: "tank", name: "Elec", _bqt: 12, g: "Dens"},
            {tree: "leftTreeName", type: "tank", name: "Eau", _bqt: 5, g: "Dens"},
            {tree: "leftTreeName", type: "impactTank", name: "Bik", _bqt: 0, g: "Mass"}
        ]
        const rightAxises = [
            {tree: "rightTreeName", type: "trunk", name: "idem", _bqt: 30, g: "Volu"},
            {tree: "rightTreeName", type: "trunk", name: "Quantité", _bqt: 30, g: "Volu"},
            {tree: "rightTreeName", type: "facet", name: "Prix", _bqt: 10, g: "Prix"},
            {tree: "rightTreeName", type: "tank", name: "Elec", _bqt: null, g: null},
            {tree: "rightTreeName", type: "tank", name: "Pétrole", _bqt: 12, g: "Dens"},
            {tree: "rightTreeName", type: "impactTank", name: "Bik", _bqt: 0, g: "Mass"}
        ]
        const expected = {
            left: [
                {tree: "leftTreeName", type: "facet", name: "Prix", _bqt: null, g: null},
                {tree: "leftTreeName", type: "trunk", name: "idem", _bqt: 20, g: "Mass"},
                {tree: "leftTreeName", type: "tank", name: "Elec", _bqt: 12, g: "Dens"},
                {tree: "leftTreeName", type: "tank", name: "Eau", _bqt: 5, g: "Dens"}
            ],
            common: [{
                left: {tree: "leftTreeName", type: "trunk", name: "Quantité", _bqt: 20, g: "Volu"},
                right: {tree: "rightTreeName", type: "trunk", name: "Quantité", _bqt: 30, g: "Volu"}
            }],
            zero: [{
                left: {tree: "leftTreeName", type: "impactTank", name: "Bik", _bqt: 0, g: "Mass"},
                right: {tree: "rightTreeName", type: "impactTank", name: "Bik", _bqt: 0, g: "Mass"}
            }],
            right: [
                {tree: "rightTreeName", type: "tank", name: "Elec", _bqt: null, g: null},
                {tree: "rightTreeName", type: "trunk", name: "idem", _bqt: 30, g: "Volu"},
                {tree: "rightTreeName", type: "facet", name: "Prix", _bqt: 10, g: "Prix"},
                {tree: "rightTreeName", type: "tank", name: "Pétrole", _bqt: 12, g: "Dens"}
            ]
        }
        separate(leftAxises, rightAxises).should.deep.equal(expected)
    })
    
    it('applyCoef', function () {
        const axises = [
            {tree: "leftTreeName", type: "facet", name: "Prix", _bqt: 4},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _bqt: 6},
            {tree: "leftTreeName", type: "tank", name: "Eau", _bqt: 8},
            {tree: "leftTreeName", type: "tank", name: "Elec", _bqt: 10},
        ]
        const coef = 2
        const expected = [
            {tree: "leftTreeName", type: "facet", name: "Prix", _bqt: 4, bqt: 8},
            {tree: "leftTreeName", type: "trunk", name: "Quantité", _bqt: 6, bqt: 12},
            {tree: "leftTreeName", type: "tank", name: "Eau", _bqt: 8, bqt: 16},
            {tree: "leftTreeName", type: "tank", name: "Elec", _bqt: 10, bqt: 20},
        ]
        
        applyCoef(coef, axises).should.deep.equal(expected)
        
    })
    
    it('updateRatios', function () {
        const axises = {
            common: [
                {
                    left: {tree: "leftTreeName", type: "trunk", name: "Quantité", bqt: 0},
                    right: {tree: "rightTreeName", type: "trunk", name: "Quantité", bqt: 1 * 60}
                },
                {
                    left: {tree: "leftTreeName", type: "facet", name: "Prix", bqt: 60 * 1},
                    right: {tree: "rightTreeName", type: "facet", name: "Prix", bqt: 30 * 1}
                },
                {
                    left: {tree: "leftTreeName", type: "tank", name: "Elec", bqt: 12 * 1},
                    right: {tree: "rightTreeName", type: "tank", name: "Elec", bqt: 24000 * 0.001}
                },
                {
                    left: {tree: "leftTreeName", type: "tank", name: "Eau", bqt: 5.5 * 60 * 60},
                    right: {tree: "rightTreeName", type: "tank", name: "Eau", bqt: 330 * 60}
                }
            ]
        }
        
        const expected = {
            common: [
                {
                    left: {tree: "leftTreeName", type: "trunk", name: "Quantité", ratio: 0, bqt: 0},
                    right: {tree: "rightTreeName", type: "trunk", name: "Quantité", ratio: 1, bqt: 1 * 60}
                },
                {
                    left: {tree: "leftTreeName", type: "facet", name: "Prix", ratio: 0.6666666666666666, bqt: 60 * 1},
                    right: {tree: "rightTreeName", type: "facet", name: "Prix", ratio: 0.3333333333333333, bqt: 30 * 1}
                },
                {
                    left: {tree: "leftTreeName", type: "tank", name: "Elec", ratio: 0.3333333333333333, bqt: 12 * 1},
                    right: {tree: "rightTreeName", type: "tank", name: "Elec", ratio: 0.6666666666666666, bqt: 24000 * 0.001}
                },
                {
                    left: {tree: "leftTreeName", type: "tank", name: "Eau", ratio: 0.5, bqt: 5.5 * 60 * 60},
                    right: {tree: "rightTreeName", type: "tank", name: "Eau", ratio: 0.5, bqt: 330 * 60}
                }
            ]
        }
        
        updateRatios(axises).should.deep.equal(expected)
    })
})