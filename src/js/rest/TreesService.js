import TrunkDTO from "domain/dto/TrunkDTO";
import TrunkHeaderDTO from "domain/dto/TrunkHeaderDTO";
import TrunkCreationDTO from "domain/dto/TrunkCreationDTO";
import RootCreationDTO from "domain/dto/RootCreationDTO";
import RestServiceBase from "rest/RestServiceBase";
import RootCreatedDTO from "domain/dto/RootCreatedDTO";
import Unit from "../domain/unit/Unit";
import AutocompleteTree from "../domain/autocomplete/AutocompleteTree";

class TreesService extends RestServiceBase {

    createTrunk: Function = (tree: TrunkCreationDTO): Promise<TrunkDTO> => {

        return this.rest(
            {
                contentType: 'application/json',
                data: JSON.stringify(tree),
                url: "api/trunk",
                type: 'POST'
            });
    };

    createRoot: Function = (rootCreation: RootCreationDTO): Promise<RootCreatedDTO> => {
        return this.rest(
            {
                contentType: 'application/json',
                data: JSON.stringify(rootCreation),
                url: "api/root",
                type: 'POST'
            }
        );
    };

    deleteRoot: Function = (id: number) => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/root/" + id,
                type: 'DELETE'
            }
        );
    };

    deleteTrunk: Function = (id: number) => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/trunk/" + id,
                type: 'DELETE'
            }
        );
    };

    listTrunkHeaderByNamePart: Function = (namePart: string): Promise<Array<TrunkHeaderDTO>> => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/trunkHeadersList/namePart/" + namePart,
                type: 'GET'
            });
    };

    listAllTrunkHeaders: Function = (): Promise<Array<TrunkHeaderDTO>> => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/trunkHeadersList",
                type: 'GET'
            }
        );
    };

    getTrunk: Function = (id: number): Promise<TrunkDTO> => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/trunk/" + id,
                type: 'GET'
            }
        );
    };
    
    getRequantifiedTrunk: Function = (requantifiedTrunkRequest:RequantifiedTrunkRequestDTO): Promise<TrunkDTO> => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/requantifiedTrunk/" + requantifiedTrunkRequest.id + "/" + requantifiedTrunkRequest.qt + "/" + requantifiedTrunkRequest.unitShortName,
                type: 'GET'
            }
        );
    };

    units: Function = (): Promise<Array<Unit>> => {
        return this.rest(
            {
                contentType: 'application/json',
                url: "api/units",
                type: 'GET'
            }
        );
    }
}

export default new TreesService();