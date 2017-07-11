import React from "react";
import IconButton from "material-ui/IconButton";
import ActionClose from "material-ui/svg-icons/content/clear";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ActionNew from "material-ui/svg-icons/av/playlist-add";
import LookupComponent from "component/LookupComponent";
import treesService from "rest/TreesService";
import ns from "service/NumberService";
import Tree from "domain/model/Tree";
import mapper from "service/MapperService";
import Root from "domain/model/Root";

export default class TrunkComponent extends React.Component {

    state = {
        createMode: false
    };

    constructor(props) {
        super(props);
    }

    onAddBtClick = () => {
        this.setState({createMode: true});
        setTimeout(() => this.createComponent.focus(), 100);
    };

    onRootDelete = (root: Root) => {
        treesService.deleteRoot(root.rootId)
            .then(this.props.onRootDelete.bind(null, this.props.trunk, root));
    };

    onRootCreate = (root: Tree) => {
        mapper.toRootCreationDTO(this.props.trunk, root)
            .then(treesService.createRoot)
            .then(mapper.toRoot)
            .then(this.dispatchOnRootCreate)
            .then(this.createModeOff);
    };

    dispatchOnRootCreate = (root: Tree) => {
        this.props.onRootCreate(this.props.trunk, root);
    };

    createModeOff = () => {
        this.setState({createMode: false});
    };

    render() {

        const createMode: Boolean = this.state.createMode;
        const trunk: Tree = this.props.trunk;
        const hasRoots: Boolean = this.props.trunk.roots;
        const roots: Array<Root> = this.props.trunk.roots;
        const isTrunk: Boolean = this.props.isRoot !== true;
        const closeLabel: string = isTrunk ? "Fermer" : "Supprimer";
        const closeAction = isTrunk ? <ActionClose/> : <ActionDelete/>;
        const qt: number = ns.round(trunk.idQtUnitName.qt / trunk.idQtUnitName.unit.coef);
        const unit: string = trunk.idQtUnitName.unit.shortName;
        const name: string = trunk.idQtUnitName.name;

        return <div>
            <li>
                <span>{qt}{unit} {name}</span>
                <IconButton tooltip="Ajouter" onClick={this.onAddBtClick}><ActionNew/></IconButton>
                <IconButton tooltip={closeLabel} onClick={this.props.onCloseClick}>{closeAction}</IconButton>
            </li>
            <ul>
                {hasRoots ? (
                    roots.map((root) => {
                        return <TrunkComponent key={root.rootId}
                                               isRoot={true}
                                               trunk={root.tree}
                                               onCloseClick={this.onRootDelete.bind(null, root)}
                                               onRootCreate={this.props.onRootCreate}
                                               onRootDelete={this.props.onRootDelete}
                        />
                    })
                ) : ('')}

                {createMode ? (
                    <li>
                        <LookupComponent ref={cc => this.createComponent = cc}
                                         onTreeLookup={this.onRootCreate}/>
                    </li>
                ) : ('')}
            </ul>
        </div>
    };

}





