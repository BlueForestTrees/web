import {arrayOf, paramsOf} from "../src/rest/rest"
import {expect} from 'chai'

describe('rest', function(){
    it('an array parameter chain', function(){
        expect(arrayOf("_ids",[1,2,3])).to.equal("_ids=1&_ids=2&_ids=3")
    })

    it('an object parameter chain', function(){
        expect(paramsOf({q:"aa", t:"T", aidx:91984})).to.equal("?q=aa&t=T&aidx=91984")
    })

    it('an object parameter chain 2', function(){
        expect(paramsOf({q:null, t:"T", aidx:91984})).to.equal("?t=T&aidx=91984")
    })

    it('an object parameter chain 3', function(){
        expect(paramsOf({q:undefined, t:"T", aidx:91984})).to.equal("?t=T&aidx=91984")
    })

    it('an object parameter chain 4', function(){
        expect(paramsOf({q:"", t:"T", aidx:91984})).to.equal("?q=&t=T&aidx=91984")
    })

    it('an object parameter chain 5', function(){
        expect(paramsOf({q:"aa", t:["T","Y"], aidx:91984})).to.equal("?q=aa&t=T&t=Y&aidx=91984")
    })
})