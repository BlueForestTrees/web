import TrunkDTO from "./TrunkDTO";
export default class RootDTO{
    root:TrunkDTO;
    rootId:number;

    Root(root:TrunkDTO){
        this.root = root;
        return this;
    }

    RootId(rootId:number){
        this.rootId = rootId;
        return this;
    }
}