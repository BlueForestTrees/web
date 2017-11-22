export default class RootCreationDTO {

    trunkId: number;
    rootId: number;
    rootQt: number;
    trunkQt: number;
    displayUnit: string;

    TrunkId(trunkId: number): RootCreationDTO {
        this.trunkId = trunkId;
        return this;
    }

    RootId(rootId: number): RootCreationDTO {
        this.rootId = rootId;
        return this;
    }

    RootQt(rootQt: string): RootCreationDTO {
        this.rootQt = rootQt;
        return this;
    }

    TrunkQt(trunkQt: string): RootCreationDTO {
        this.trunkQt = trunkQt;
        return this;
    }

    DisplayUnit(displayUnit: string): RootCreationDTO {
        this.displayUnit = displayUnit;
        return this;
    }
}