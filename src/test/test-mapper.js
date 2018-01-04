import {expect} from 'chai';

import {mock, match} from 'sinon';
import units from '../main/services/units'
import mapper from '../main/services/mapper';

describe('Mapper', function () {

    let lookupUnits;

    beforeEach(() => {
        lookupUnits = mock(units)
    });

    describe('#toTrunk(null)', function () {
        it('should return null', function () {

            lookupUnits
                .expects("lookup_bak")
                .never();

            expect(mapper.toTrunk(null)).to.not.exist;

            lookupUnits.verify();

        });
    });

    describe('#toTrunk("")', function () {
        it('should return null', function () {

            lookupUnits
                .expects("lookup_bak")
                .never();

            expect(mapper.toTrunk(null)).to.not.exist;

            lookupUnits.verify();

        });
    });

    describe('#toTrunk(" ")', function () {
        it('should return null', function () {

            lookupUnits
                .expects("lookup_bak")
                .never();

            expect(mapper.toTrunk(null)).to.not.exist;

            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10")', function () {
        it('should return qt unit', function () {

            lookupUnits
                .expects("lookup_bak")
                .withArgs("")
                .returns(true);

            expect(mapper.toTrunk("10")).to.deep.equal({qt:"10", unit:"", name:null});
            lookupUnits.verify();
        });
    });

    describe('#toTrunk("10 ")', function () {
        it('should return qt unit', function () {

            lookupUnits
                .expects("lookup_bak")
                .withArgs("")
                .returns(true);

            expect(mapper.toTrunk("10 ")).to.deep.equal({qt:"10", unit:"", name:null});
            lookupUnits.verify();
        });
    });

    describe('#toTrunk("10k")', function(){
        it('should return null', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("k")
                .returns(false);

            expect(mapper.toTrunk("10k")).to.deep.equal({name:'10k'});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10k eau")', function(){
        it('should return null', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("k")
                .returns(false);

            expect(mapper.toTrunk("10k eau")).to.deep.equal({name:'10k eau'});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10kg")', function(){
        it('should return a qtUnit', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("kg")
                .returns(true);

            expect(mapper.toTrunk("10kg")).to.deep.equal({qt:"10", unit:"kg", name:null});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10kg ")', function(){
        it('should return a qtUnit', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("kg")
                .returns(true);

            expect(mapper.toTrunk("10kg ")).to.deep.equal({qt:"10", unit:"kg", name:null});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10kg eau")', function(){
        it('should return a qtUnitName', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("kg")
                .returns(true);

            expect(mapper.toTrunk("10kg eau")).to.deep.equal({qt:"10", unit:"kg", name:"eau"});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("10kg eau de rochas")', function(){
        it('should return a qtUnitName', function(){

            lookupUnits
                .expects("lookup_bak")
                .withArgs("kg")
                .returns(true);

            expect(mapper.toTrunk("10kg eau de rochas")).to.deep.equal({qt:"10", unit:"kg", name:"eau de rochas"});
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("eau")', function(){
        it('should return a name', function(){

            lookupUnits
                .expects("lookup_bak")
                .never();

            expect(mapper.toTrunk("eau")).to.deep.equal({ qt: null, unit: null, name: 'eau' });
            lookupUnits.verify();

        });
    });

    describe('#toTrunk("eau de rochas")', function(){
        it('should return a name', function(){

            lookupUnits
                .expects("lookup_bak")
                .never();

            expect(mapper.toTrunk("eau de rochas")).to.deep.equal({ qt: null, unit: null, name: 'eau de rochas' });
            lookupUnits.verify();

        });
    });

});