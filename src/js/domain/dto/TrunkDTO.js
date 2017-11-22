import TrunkHeaderDTO from "domain/dto/TrunkHeaderDTO";
import RootDTO from "domain/dto/RootDTO";

export default class TrunkDTO {

    header: TrunkHeaderDTO;
    roots: Array<RootDTO>;

    Header(header:TrunkHeaderDTO){
        this.header = header;
        return this;
    }

    Roots(childs: Array<TrunkDTO>): TrunkDTO {
        this.roots = childs;
        return this;
    }


}