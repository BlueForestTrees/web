import {expect} from 'chai'
import {buchheim, DrawTree, iterativelyWalk, treePlacement} from "../src/services/tree"

describe('tree', function () {
    it('test algo', function () {
        const tree = {
            name: "1", roots: [
                {name: "1.0", roots: []},
                {name: "1.1", roots: [
                        {name: "1.1.0", roots: [
                                {name: "1.1.0.1", roots: []},
                                {name: "1.1.0.2", roots: []},
                                {name: "1.1.0.3", roots: []},
                            ]},
                        {name: "1.1.1", roots: []}
                ]},
                {name: "1.2", roots: []},
                {name: "1.3", roots: [
                        {name: "1.3.0", roots: []},
                        {name: "1.3.1", roots: []},
                        {name: "1.3.2", roots: [
                                {name: "1.3.2.0", roots: []},
                                {name: "1.3.2.1", roots: []},
                                {name: "1.3.2.2", roots: []}
                            ]}
                    ]}
            ]
        }

        console.log(treePlacement(tree, "roots").map(n=>n.tree.name + " - " + n.y + " - " + n.x))
    })
})