import chai from 'chai'
import {add, objectId} from "../../main/services/calculations"
import {init} from "../setup"

chai.should()

describe('Divers calculations', function () {

    beforeEach(init)

    it('add 2 quantities', function () {
        add({qt:1,unit:"kg"},{qt:119, unit:"kg"}).should.be.deep.equal({qt:120,unit:"kg"})
    })

    it('add 2 quantities differents units', function () {
        add({qt:1000,unit:"g"},{qt:119, unit:"kg"}).should.be.deep.equal({qt:120,unit:"kg"})
    })

    it('generate objectIds', function () {
        const count = 100000
        const objs = {}
        for (let i = 0; i < count; i++) {
            objs[objectId()] = true
        }
        Object.keys(objs).length.should.equal(count)
    })
})