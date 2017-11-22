export default class TrunkHeaderDTO {
    id: number;
    name: string;
    qt: number;
    displayUnit: string;

    Id(id: number): TrunkHeaderDTO {
        this.id = id;
        return this;
    }

    Name(name: string): TrunkHeaderDTO {
        this.name = name;
        return this;
    }

    Qt(qt: number): TrunkHeaderDTO {
        this.qt = qt;
        return this;
    }

    DisplayUnit(displayUnit: string): TrunkHeaderDTO {
        this.displayUnit = displayUnit;
        return this;
    }


}