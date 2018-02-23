import chai from 'chai';
import {align, applyRatio, denorm, separate} from "../../../main/services/mapper";
import {withNameIdQuantity} from "../../testPlumbing";

chai.should();

describe('Mapper', function () {

    describe('applyRatio', function () {
        it('normal applyRatio', function () {

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
                        {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 60, unit: "sec"},
                        {tree: "leftTreeName", type: "facet", axis: "Prix", qt: 60, unit: "sec"},
                        {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 12, unit: "mol"},
                        {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 5.5, unit: "h"}
                    ],
                    right: [
                        {tree: "rightTreeName", type: "trunk", axis: "Quantité", qt: 1, unit: "min"},
                        {tree: "rightTreeName", type: "facet", axis: "Prix", qt: 30, unit: "sec"},
                        {tree: "rightTreeName", type: "tank", axis: "Elec", qt: 24000, unit: "mmol"},
                        {tree: "rightTreeName", type: "tank", axis: "Eau", qt: 330, unit: "min"}
                    ]
                };

                const expected = {
                    left: [
                        {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 60, unit: "sec", ratio: 1},
                        {tree: "leftTreeName", type: "facet", axis: "Prix", qt: 60, unit: "sec", ratio: 1},
                        {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 12, unit: "mol", ratio: 0.5},
                        {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 5.5, unit: "h", ratio: 1}
                    ],
                    right: [
                        {tree: "rightTreeName", type: "trunk", axis: "Quantité", qt: 1, unit: "min", ratio: 1},
                        {tree: "rightTreeName", type: "facet", axis: "Prix", qt: 30, unit: "sec", ratio: 0.5},
                        {tree: "rightTreeName", type: "tank", axis: "Elec", qt: 24000, unit: "mmol", ratio: 1},
                        {tree: "rightTreeName", type: "tank", axis: "Eau", qt: 330, unit: "min", ratio: 1}
                    ]
                };

                applyRatio(common, fakeBaseQtFct).should.deep.equal(expected);
            }
        );
    });
    describe('separate', function () {
        it('normal separate', function () {
            const leftAxises = [
                {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 20, unit: "l"},
                {tree: "leftTreeName", type: "facet", axis: "Prix", qt: null, unit: null},
                {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 12, unit: "mol"},
                {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 5, unit: "mol"}
            ];
            const rightAxises = [
                {tree: "rightTreeName", type: "trunk", axis: "Quantité", qt: 30, unit: "l"},
                {tree: "rightTreeName", type: "facet", axis: "Prix", qt: 10, unit: "€"},
                {tree: "rightTreeName", type: "tank", axis: "Elec", qt: null, unit: null},
                {tree: "rightTreeName", type: "tank", axis: "Pétrole", qt: 12, unit: "mol"}
            ];
            const expected = {
                left: [
                    {tree: "leftTreeName", type: "facet", axis: "Prix", qt: null, unit: null},
                    {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 12, unit: "mol"},
                    {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 5, unit: "mol"}
                ],
                common: {
                    left: [
                        {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 20, unit: "l"}
                    ], right: [
                        {tree: "rightTreeName", type: "trunk", axis: "Quantité", qt: 30, unit: "l"}
                    ]
                },
                right: [
                    {tree: "rightTreeName", type: "tank", axis: "Elec", qt: null, unit: null},
                    {tree: "rightTreeName", type: "facet", axis: "Prix", qt: 10, unit: "€"},
                    {tree: "rightTreeName", type: "tank", axis: "Pétrole", qt: 12, unit: "mol"}
                ]
            };
            separate(leftAxises, rightAxises).should.deep.equal(expected);
        });
    });
    describe('align', function () {
        it('normal align', function () {
            const denorm = [
                {tree: "leftTreeName", type: "facet", axis: "Prix", qt: 20, unit: "€"},
                {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 20, unit: "l"},
                {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 5, unit: "mol"},
                {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 12, unit: "mol"},
            ];
            const coef = 2;
            const expected = [
                {tree: "leftTreeName", type: "facet", axis: "Prix", qt: 40, unit: "€"},
                {tree: "leftTreeName", type: "trunk", axis: "Quantité", qt: 40, unit: "l"},
                {tree: "leftTreeName", type: "tank", axis: "Eau", qt: 10, unit: "mol"},
                {tree: "leftTreeName", type: "tank", axis: "Elec", qt: 24, unit: "mol"},
            ];

            align(denorm, coef).should.deep.equal(expected);

        });
    });
    describe('denorm', function () {
        it('minimal denorm', function () {
            const tree = {
                trunk: withNameIdQuantity("Skate", "a", 1, "kg"),
                facets: {
                    items: []
                },
                tank: {
                    items: []
                }
            };
            const expected = [
                {
                    "tree": "Skate",
                    "axis": "Quantité",
                    "qt": 1,
                    "type": "trunk",
                    "unit": "kg"
                }
            ];
            denorm(tree).should.be.deep.equal(expected);
        });

        it('complete denorm', function () {
            const tree = {
                trunk: withNameIdQuantity("Skate", "a", 1, "kg"),
                facets: {
                    items: [withNameIdQuantity("vitamine", "b", 1, "g"), withNameIdQuantity("voutamine", "d", 7, "g")]
                },
                tank: {
                    items: [withNameIdQuantity("eau", "b", 3, "L"), withNameIdQuantity("elec", "c", 2, "L")]
                }
            };
            const expected = [
                {
                    "tree": "Skate",
                    "axis": "Quantité",
                    "qt": 1,
                    "type": "trunk",
                    "unit": "kg"
                }, {
                    "tree": "Skate",
                    "axis": "vitamine",
                    "qt": 1,
                    "type": "facet",
                    "unit": "g"
                }, {
                    "tree": "Skate",
                    "axis": "voutamine",
                    "qt": 7,
                    "type": "facet",
                    "unit": "g"
                }, {
                    "tree": "Skate",
                    "axis": "eau",
                    "qt": 3,
                    "type": "tank",
                    "unit": "L"
                }, {
                    "tree": "Skate",
                    "axis": "elec",
                    "qt": 2,
                    "type": "tank",
                    "unit": "L"
                }
            ];
            denorm(tree).should.be.deep.equal(expected);
        });
    });

});