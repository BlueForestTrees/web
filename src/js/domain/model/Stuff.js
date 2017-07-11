import TrunkDTO from "domain/dto/TrunkDTO";
import QtUnitName from "domain/model/QtUnitName";

export default class Stuff {
     stuffParts: Array<TrunkDTO>;

    constructor() {
        this.stuffParts = [];
    }

     add(stuffPart: TrunkDTO): void {
        this.stuffParts.push(stuffPart);
    }

     getQtUnitName(): QtUnitName {
        let qtSum : number = this.stuffParts.map(this.quantities).reduce((pv, cv) => pv+cv, 0);
        let unit : string = this.stuffParts[0].displayUnit;
        let name : string = this.stuffParts[0].name;

        return new QtUnitName()
            .Qt(qtSum)
            .Unit(unit)
            .Name(name);
    }

     static quantities(tree) {
        return tree.rootQt;
    }
}
