import QtUnitName from "domain/model/QtUnitName";
import TrunkCreationDTO from "domain/dto/TrunkCreationDTO";
import Unit from "domain/unit/Unit";
import TrunkDTO from "domain/dto/TrunkDTO";
import Tree from "domain/model/Tree";
import unitService from "service/UnitService";
import IdQtUnitName from "domain/model/IdQtUnitName";
import TrunkHeaderDTO from "domain/dto/TrunkHeaderDTO";
import RootCreatedDTO from "domain/dto/RootCreatedDTO";
import Root from "domain/model/Root";
import AutocompleteTree from "domain/autocomplete/AutocompleteTree";
import RootCreationDTO from "domain/dto/RootCreationDTO";
import QtUnitShortName from "../domain/model/QtUnitShortName";
import RootDTO from "../domain/dto/RootDTO";
import RequantifiedTrunkRequestDTO from "../domain/dto/RequantifiedTrunkRequestDTO";

class MapperService {

    toRequantifiedTrunkRequestDTO = (autocompleteTree: AutocompleteTree) => {
        return Promise.resolve(
            new RequantifiedTrunkRequestDTO()
                    .Id(autocompleteTree.trunkHeaderDTO.id)
                    .Qt(autocompleteTree.saisie.qt)
                    .UnitShortName(autocompleteTree.saisie.unit.shortName)
        );
    };

    toRootCreationDTO = (trunk: Tree, root: Tree): RootCreationDTO => {
        return Promise.resolve(
            new RootCreationDTO()
                .TrunkId(trunk.idQtUnitName.id)
                .RootId(root.idQtUnitName.id)
                .DisplayUnit(root.idQtUnitName.unit.shortName)
                .TrunkQt(trunk.idQtUnitName.qt)
                .RootQt(root.idQtUnitName.qt)
        );
    };

    toRoot = (rootCreatedDTO: RootCreatedDTO): Root => {
        return (
            new Root()
                .RootId(rootCreatedDTO.id)
                .Tree(this.toTree(rootCreatedDTO.root))
        );
    };

    toTree = (trunkDTO: TrunkDTO): Tree => {
        return (
            new Tree()
                .IdQtUnitName(this.toIdQtUnitName(trunkDTO.header))
                .Roots(this.toRoots(trunkDTO.roots))
        );
    };

    toRoots = (rootsDTO: Array<RootDTO>): Array<Root> => {
        let rootList: Array<Tree> = [];
        if (rootsDTO) {
            rootList = rootsDTO.map(
                (rootDTO) => new Root()
                    .RootId(rootDTO.rootId)
                    .Tree(new Tree()
                        .IdQtUnitName(this.toIdQtUnitName(rootDTO.root.header))
                        .Roots(this.toRoots(rootDTO.root.roots)))
            )
        }
        return rootList;
    };

    toIdQtUnitName = (trunkHeaderDTO: TrunkHeaderDTO): IdQtUnitName => {
        return new IdQtUnitName()
            .Id(trunkHeaderDTO.id)
            .Qt(trunkHeaderDTO.qt)
            .Unit(unitService.lookUp(trunkHeaderDTO.displayUnit))
            .Name(trunkHeaderDTO.name)
    };

    toTrunkCreationDTO = (autocompleteTree: AutocompleteTree): Promise<TrunkCreationDTO> => {
        const saisie: QtUnitName = autocompleteTree.saisie;
        return Promise.resolve(
            new TrunkCreationDTO()
                .Qt(saisie.qt * saisie.unit.coef)
                .DisplayUnit(saisie.unit.shortName)
                .Name(saisie.name)
        );
    };

    toTrunkHeader = (tree: Tree): TrunkHeaderDTO => {
        return new TrunkHeaderDTO()
            .Id(tree.idQtUnitName.id)
            .Qt(tree.idQtUnitName.qt)
            .DisplayUnit(tree.idQtUnitName.unit.shortName)
            .Name(tree.idQtUnitName.name);

    };


    toRaws = (trees: Array<Tree>): Object => {
        const raws: Object = {};
        trees.map((tree: Tree) => {
            this.applyOnRoots(this.appendRawQt, tree, raws);
        });
        return raws;
    };

    appendRawQt: Function = (tree: Tree, raws: Object) => {
        if (!tree.roots || tree.roots.length === 0) {
            if (!raws[tree.idQtUnitName.id]) {
                raws[tree.idQtUnitName.id] = new IdQtUnitName().IdQtUnitName(tree.idQtUnitName).Qt(0);
            }
            raws[tree.idQtUnitName.id].qt += tree.idQtUnitName.qt;
        }
    };

    applyOnRoots = (fct: Function, tree: Tree, ...rest: any) => {
        fct(tree, ...rest);
        tree.roots.map((root: Root) => {
            this.applyOnRoots(fct, root.tree, ...rest);
        });
        return tree;
    };

}

export default new MapperService();