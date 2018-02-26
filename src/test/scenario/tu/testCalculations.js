import chai from 'chai';
import {align, applyRatio, denorm, separate} from "../../../main/services/radar-calc";
import {withNameIdQuantity} from "../../testPlumbing";
import {bestQuantity} from "../../../main/services/calculations";

chai.should();

describe('Calculations', function () {

    describe('quantity', function () {
        it('best quantity -1', function () {
            bestQuantity({qt: 1010, unit: "g"}).should.deep.equal({qt: 1.01, unit: "kg"});
        });
        it('best quantity 0', function () {
            bestQuantity({qt: 1001, unit: "g"}).should.deep.equal({qt: 1, unit: "kg"});
        });
        it('best quantity 1', function () {
            bestQuantity({qt: 890000, unit: "g"}).should.deep.equal({qt: 890, unit: "kg"});
        });
        it('best quantity 2', function () {
            bestQuantity({qt: 11696000, unit: "g"}).should.deep.equal({qt: 1.17, unit: "t"});
        });
        it('best quantity 3', function () {
            bestQuantity({qt: 0.001, unit: "kg"}).should.deep.equal({qt: 1, unit: "g"});
        });
        it('best quantity 3', function () {
            bestQuantity({qt: 0.00001, unit: "kg"}).should.deep.equal({qt: 10, unit: "mg"});
        });
        it('best quantity 4', function () {
            bestQuantity({qt: 1.001, unit: "kg"}).should.deep.equal({qt: 1, unit: "kg"});
        });
        it('best quantity 5', function () {
            bestQuantity({qt: 9.99, unit: "kg"}).should.deep.equal({qt: 9.99, unit: "kg"});
        });
        it('best quantity 6', function () {
            bestQuantity({qt: 9.999, unit: "kg"}).should.deep.equal({qt: 10, unit: "kg"});
        });
    });

});