export default class TrunkCreationDTO {
    qt: number;
    name: string;
    displayUnit: string;

    Qt(qt: number): TrunkCreationDTO {
        this.qt = qt;
        return this;
    }

    Name(name: string): TrunkCreationDTO {
        this.name = name;
        return this;
    }

    DisplayUnit(displayUnit: string): TrunkCreationDTO {
        this.displayUnit = displayUnit;
        return this;
    }

}