import React, {Component} from "react";
import LookupComponent from "component/LookupComponent";
import AdminComponent from "component/AdminComponent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import treesService from "rest/TreesService";
import TreeCardsComponent from "component/TreeCardsComponent";
import TreeHeaderListComponent from "component/TreeHeaderListComponent";
import mapper from "./service/MapperService";
import TankComponent from "./component/TankComponent";
import Tree from "./domain/model/Tree";
import TrunkHeaderDTO from "./domain/dto/TrunkHeaderDTO";
import Root from "./domain/model/Root";

export default class App extends Component {

    state = {
        treeHeaderList: [],
        openedTrees: []
    };

    constructor(props) {
        super(props);
        treesService.listAllTrunkHeaders()
            .then(this.setTreeHeaderList);
    }

    setTreeHeaderList = (treeHeaderList: Array<TrunkHeaderDTO>) => {
        this.setState({treeHeaderList: treeHeaderList});
    };

    openTreeCard = (tree: Tree) => {
        this.setState({
            treeHeaderList: this.state.treeHeaderList.filter((treeHeader) => treeHeader.id !== tree.idQtUnitName.id),
            openedTrees: [...this.state.openedTrees, tree]
        });
    };

    closeTreeCard = (tree: Tree) => {
        this.setState({
            treeHeaderList: [...this.state.treeHeaderList, mapper.toTrunkHeader(tree)],
            openedTrees: this.state.openedTrees.filter((currentTree) => currentTree.idQtUnitName.id !== tree.idQtUnitName.id)
        });
    };

    deleteTree = (treeId: number) => {
        treesService.deleteTrunk(treeId)
            .then(() => {
                this.setState({
                    treeHeaderList: this.state.treeHeaderList.filter((treeHeader) => treeHeader.id !== treeId),
                    openedTrees: this.state.openedTrees.filter((tree) => tree.idQtUnitName.id !== treeId)
                });
            });
    };

    loadAndOpen = (treeId: number) => {
        treesService.getTrunk(treeId)
            .then(mapper.toTree)
            .then(this.openTreeCard);
    };

    onRootDelete = (trunk: Tree, root: Root) => {
        trunk.roots = trunk.roots.filter((r) => r.rootId !== root.rootId);
        this.updateTreesState();
    };

    onRootCreate = (trunk: Tree, root: Root) => {
        trunk.roots = [...trunk.roots, root];
        this.updateTreesState();
    };

    updateTreesState = () => {
        this.setState({openedTrees: this.state.openedTrees});
    };

    render = () => {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <header className="header">
                        <div className="container text-center">
                            <LookupComponent onTreeLookup={this.openTreeCard} />
                        </div>
                    </header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <TreeHeaderListComponent treeHeaderList={this.state.treeHeaderList}
                                                         onSelectTree={this.loadAndOpen}
                                                         onDeleteTree={this.deleteTree}
                                />
                            </div>
                            <div className="col-10">
                                <TreeCardsComponent trees={this.state.openedTrees}
                                                    onCloseTreeCardClick={this.closeTreeCard}
                                                    onRootCreate={this.onRootCreate}
                                                    onRootDelete={this.onRootDelete}
                                />

                                <TankComponent trees={this.state.openedTrees}/>

                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <AdminComponent/>
                        </div>
                    </footer>
                </div>
            </MuiThemeProvider>
        )
    };
}