import chai from 'chai';
import {align, denorm} from "../../../main/services/mapper";
import {withNameIdQuantity} from "../../testPlumbing";

chai.should();

describe('Mapper', function () {

    describe('align', function () {
        it('normal align', function(){
            const denorm = [
                {tree: "leftTreeName", type:"facet", axis: "Prix", qt:20, unit:"€"},
                {tree: "leftTreeName", type:"trunk", axis: "Quantité", qt:20, unit:"l"},
                {tree: "leftTreeName", type:"tank", axis: "Eau", qt:5, unit:"mol"},
                {tree: "leftTreeName", type:"tank", axis: "Elec", qt:12, unit:"mol"},
            ];
            const coef = 2;
            const expected = [
                {tree: "leftTreeName", type:"facet", axis: "Prix", qt:40, unit:"€"},
                {tree: "leftTreeName", type:"trunk", axis: "Quantité", qt:40, unit:"l"},
                {tree: "leftTreeName", type:"tank", axis: "Eau", qt:10, unit:"mol"},
                {tree: "leftTreeName", type:"tank", axis: "Elec", qt:24, unit:"mol"},
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