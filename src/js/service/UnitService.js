import Unit from "domain/unit/Unit";
import treesService from "rest/TreesService";

class UnitService {

    units: Map<string, Unit>;

    constructor() {
        this.loadUnits();
    }

    loadUnits = (): void => {
        treesService.units()
                .then(this.setUnitsMap);
    };

    setUnitsMap = (unitsMap:Map<String, Unit>)=>{
        this.units = unitsMap;
    };

    /**
     * Renvoie un tableau d'unité correspondant à la recherche.
     */
    searchUnit(unitShortNamePart: string): Promise<Array<Unit>> {
        const topResults: Array<Unit> = [];
        const bottomResults: Array<Unit> = [];
        if (this.units[unitShortNamePart]) {
            topResults.push(this.units[unitShortNamePart]);
        } else {
            for(const unitKey in this.units){
                const unit = this.units[unitKey];
                if (unit.shortName.indexOf(unitShortNamePart) > -1) {
                    topResults.push(unit);
                } else if (unit.name.indexOf(unitShortNamePart) > -1) {
                    bottomResults.push(unit);
                }
            }
        }

        return Promise.resolve(topResults.concat(bottomResults));
    };

    lookUp(unitShortName: String): Unit {
        return this.units[unitShortName];
    };
}

export default new UnitService();