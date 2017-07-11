import _Unit from "domain/unit/Unit";

export default class IdQtUnitName {
    id: number;
    qt: number;
    unit: _Unit;
    name: string;

    IdQtUnitName(idQtUnitName: IdQtUnitName){
        return this.Id(idQtUnitName.id)
            .Qt(idQtUnitName.qt)
            .Unit(idQtUnitName.unit)
            .Name(idQtUnitName.name);
    }

    Id(id:number):IdQtUnitName{
        this.id = id;
        return this;
    }

    Qt(qt: number): IdQtUnitName {
        this.qt = qt;
        return this;
    }

    Unit(unit: _Unit): IdQtUnitName {
        this.unit = unit;
        return this;
    }

    Name(name: string): IdQtUnitName {
        this.name = name;
        return this;
    }
}