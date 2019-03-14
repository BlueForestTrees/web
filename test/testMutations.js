import {expect, assert} from 'chai'
import Do from "../src/const/do"
import mutations from "../src/store/mutation/treeMutations"

describe('tree Mutations', function () {
    it('add fragment element, new fragment', function () {
        const state = {}
        const tree = {}
        const fragment = "FRAG"
        const element = {_id: 56, name: "toto"}

        mutations[Do.ADD_TO_FRAGMENT](state, {tree, fragment, element})

        expect(tree[fragment]).to.deep.equal([element])
    })

    it('add fragment element, new fragment element', function () {
        const state = {}
        const fragment = "FRAG"
        const tree = {[fragment]: [{_id: 57, name: "tutu"}]}
        const element = {_id: 56, name: "toto"}

        mutations[Do.ADD_TO_FRAGMENT](state, {tree, fragment, element})

        expect(tree[fragment]).to.deep.equal([{_id: 57, name: "tutu"}, element])
    })

    it('add fragment element, existing fragment element and merge', function () {
        const state = {}
        const fragment = "FRAG"
        const tree = {[fragment]: [{_id: "57", name: "tutu", quantity: {bqt: 4, g: "Dens"}}]}
        const element = {_id: "57", name: "tutu", quantity: {bqt: 1, g: "Dens"}}
        const merge = true

        mutations[Do.ADD_TO_FRAGMENT](state, {tree, fragment, element, merge})

        expect(tree[fragment]).to.deep.equal([{_id: "57", name: "tutu", quantity: {bqt: 5, g: "Dens"}}])
    })

    it('add fragment element, existing fragment element and no merge', function () {
        const state = {}
        const fragment = "FRAG"
        const tree = {[fragment]: [{_id: "57", name: "tutu", quantity: {bqt: 4, g: "Dens"}}]}
        const element = {_id: "57", name: "tutu", quantity: {bqt: 1, g: "Dens"}}
        const merge = false

        assert.throws(
            () => mutations[Do.ADD_TO_FRAGMENT](state, {tree, fragment, element, merge}),
            Error,
            "existing"
        )
    })
})