import chai from 'chai';
import {initUnits} from "trees-units"
import {loadUnitsData} from "../../../../../api/src/main/service/unit/grandeurService";
import {add} from "../../../main/services/calculations";

chai.should();

const init = async () => {
    initUnits(await loadUnitsData());
};

describe('Divers calculations', function () {

    beforeEach(init);

    it('add 2 quantities', function () {
        add({qt:1,unit:"kg"},{qt:119, unit:"kg"}).should.be.deep.equal({qt:120,unit:"kg"});
    });

    it('add 2 quantities differents units', function () {
        add({qt:1000,unit:"g"},{qt:119, unit:"kg"}).should.be.deep.equal({qt:120,unit:"kg"});
    });


});