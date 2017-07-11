import TrunkDTO from "domain/dto/TrunkDTO";

export default class RootCreatedDTO{
    id:number;
    root:TrunkDTO;
    rootQt:number;
    displayUnit:string;

    Id(id: number): RootCreatedDTO {
        this.id = id;
        return this;
    }

    Root(root: TrunkDTO): RootCreatedDTO {
        this.root = root;
        return this;
    }

    RootQt(rootQt: string): RootCreatedDTO {
        this.rootQt = rootQt;
        return this;
    }

    DisplayUnit(displayUnit: string): RootCreatedDTO {
        this.displayUnit = displayUnit;
        return this;
    }
}