import QtUnitName from "domain/model/QtUnitName";
import TrunkHeaderDTO from "domain/dto/TrunkHeaderDTO";

export default class AutocompleteTree {
    saisie: QtUnitName;
    text: string;
    value: string;
    trunkHeaderDTO: TrunkHeaderDTO;

    Saisie(saisie: QtUnitName): AutocompleteTree {
        this.saisie = saisie;
        return this;
    }

    Text(text: string): AutocompleteTree {
        this.text = text;
        return this;
    }

    Value(value: string): AutocompleteTree {
        this.value = value;
        return this;
    }


    TrunkHeaderDTO(trunkHeaderDTO: TrunkHeaderDTO): AutocompleteTree {
        this.trunkHeaderDTO = trunkHeaderDTO;
        return this;
    }

}