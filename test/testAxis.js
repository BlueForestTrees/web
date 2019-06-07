import chai from 'chai'
import {buildAxises, updateRatios, separate} from "../src/services/axis"
import {init, withNameIdBqtG} from "./setup"
import {applyAxisCoef} from "../src/services/calculations"


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
            {"name": "vitamine", "bqt": 1, bqt: 1, "tree": "Skate", "type": "facets", "g": "Mass"},
            {"name": "voutamine", "bqt": 7, bqt: 7, "tree": "Skate", "type": "facets", "g": "Mass"},
            {"name": "eau", "bqt": 3, bqt: 3, "tree": "Skate", "type": "tank", "g": "Volu"},
            {"name": "elec", "bqt": 2, bqt: 2, "tree": "Skate", "type": "tank", "g": "Volu"},
            {"name": "co2", "bqt": 3, bqt: 3, "tree": "Skate", "type": "impactsTank", "g": "Mass"},
            {"name": "poison", "bqt": 4, bqt: 4, "tree": "Skate", "type": "impactsTank", "g": "Volu"}
        ]
        buildAxises(tree).should.be.deep.equal(expected)
    })

    it('separate simple', function () {
        const leftAxises = [
            {name: "Energie", bqt: 1, g: "Ene1"},
            {name: "Protéine", bqt: 10, g: "Mass"},
            {name: "Saccharose", bqt: 1, g: "Mass"},
        ]

        const rightAxises = [
            {name: "Saccharose", bqt: 6, g: "Mass"},
            {name: "Couscous", bqt: 9, g: "Grains"},
        ]

        const expected = {
            left: [
                {name: "Energie", bqt: 1, g: "Ene1"},
                {name: "Protéine", bqt: 10, g: "Mass"},
            ],
            common: [
                {left: {name: "Saccharose", bqt: 1, g: "Mass"}, right: {name: "Saccharose", bqt: 6, g: "Mass"}}
            ],
            right: [
                {name: "Couscous", bqt: 9, g: "Grains"}
            ],
        }

        separate(leftAxises, rightAxises).should.deep.equal(expected)
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