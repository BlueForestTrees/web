import unitService from "service/UnitService";
import dataService from "rest/TreesService";
import QtUnitName from "domain/model/QtUnitName";
import Unit from "domain/unit/Unit";
import AutocompleteTree from "domain/autocomplete/AutocompleteTree";
import TrunkHeaderDTO from "domain/dto/TrunkHeaderDTO";
import AutocompleteQtUnitShortName from "domain/autocomplete/AutocompleteQtUnitShortName";
import QtUnitShortName from "domain/model/QtUnitShortName";

const toQtUnitShortName = (termToParse: string): QtUnitShortName => {
    const qtUnitArray = termToParse.match(/(\d*[.,]?\d*)(\S*)/);
    if (qtUnitArray && qtUnitArray[2] && qtUnitArray[2] !== "" && !termToParse.endsWith(" ")) {
        return new QtUnitShortName(
                qtUnitArray[1].replace(",", "."),
                qtUnitArray[2]
        );
    } else {
        return null;
    }
};

const toQtUnitName = (termToParse: string): QtUnitName => {
    const qtUnitNameArray = termToParse.match(/(\d*[.,]?\d*)(\S*) (.*)/);
    let qtUnitName = null;

    if (qtUnitNameArray && qtUnitNameArray[3] && qtUnitNameArray[3].length > 0) {
        qtUnitName = new QtUnitName()
                .Qt(qtUnitNameArray[1].replace(",", "."))
                .Unit(unitService.lookUp(qtUnitNameArray[2]))
                .Name(qtUnitNameArray[3]);
    }

    return qtUnitName;
};

const autoCompleteTree = (saisie: QtUnitName, input: string): Array<AutocompleteTree> => {
    return dataService.listTrunkHeaderByNamePart(saisie.name)
        .then((trees: Array<TrunkHeaderDTO>) => {
            const qtUnit:String = saisie.qt + saisie.unit.shortName + " ";
            const perfectMatch:Boolean = trees.filter(tree=>tree.name===saisie.name).length > 0;
            const result:Array<AutocompleteTree> = trees.map((tree: TrunkHeaderDTO) => {
                return new AutocompleteTree()
                    .Saisie(saisie)
                    .Text(qtUnit + tree.name)
                    .Value(input)
                    .TrunkHeaderDTO(tree);
            });

            if(!perfectMatch){
                result.unshift(new AutocompleteTree()
                    .Saisie(saisie)
                    .Text(input + " (créer)")
                    .Value("Création..."));
            }

            return result;
        });
};

const autoCompleteQtUnit = (qtUnitShortName: QtUnitShortName): Array<AutocompleteQtUnitShortName> => {
    return unitService.searchUnit(qtUnitShortName.unitShortName)
        .then((units: Array<Unit>) => {
            return units.map((unit: Unit) => {
                const text = qtUnitShortName.qt + unit.shortName + " ";
                const value = unit.shortName + " (" + unit.name + ")";
                return new AutocompleteQtUnitShortName(qtUnitShortName, text, value);
            });
        });
};

export default (input: string) => {
    const qtUnitName: QtUnitName = toQtUnitName(input);
    const qtUnitShortName: QtUnitShortName = toQtUnitShortName(input);

    if (qtUnitName) {
        return autoCompleteTree(qtUnitName, input);
    } else if (qtUnitShortName) {
        return autoCompleteQtUnit(qtUnitShortName);
    } else {
        return Promise.resolve([]);
    }
};