import Tree from "domain/model/Tree";
export default class Root {
    rootId:number;
    tree:Tree;
    
    RootId(rootId:number){
        this.rootId = rootId;
        return this;
    }

    Tree(tree:Tree){
        this.tree = tree;
        return this;
    }
}