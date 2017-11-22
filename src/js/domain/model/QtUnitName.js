import _Unit from "domain/unit/Unit";

export default class QtUnitName {
    id: number;
    qt: number;
    unit: _Unit;
    name: string;

    Qt(qt: number): QtUnitName {
        this.qt = qt;
        return this;
    }

    Unit(unit: _Unit): QtUnitName {
        this.unit = unit;
        return this;
    }

    Name(name: string): QtUnitName {
        this.name = name;
        return this;
    }
}