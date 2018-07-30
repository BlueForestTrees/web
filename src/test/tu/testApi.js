import {paramsOf} from "../../main/rest/rest"
import {expect} from 'chai'

describe('rest', function(){
    it('build a parameter chain', function(){
        expect(paramsOf("_ids",[1,2,3])).to.equal("_ids=1&_ids=2&_ids=3")
    })
})