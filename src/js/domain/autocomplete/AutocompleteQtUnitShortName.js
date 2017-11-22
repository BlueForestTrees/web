import QtUnitShortName from "domain/model/QtUnitShortName";

export default class AutocompleteQtUnitShortName extends QtUnitShortName{
    text: string;
    value: string;

    constructor(qtUnitShortName : QtUnitShortName, text:string, value:string) {
        super(qtUnitShortName.qt, qtUnitShortName.unitShortName);
        this.text = text;
        this.value = value;
    }
}