import React, {Component} from "react";
import TreeCardComponent from "component/TreeCardComponent";

export default class TreeCardsComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.trees.map(
                        (tree, treeIndex) =>
                            <TreeCardComponent key={tree.idQtUnitName.id} tree={tree}
                                               onCloseClick={this.props.onCloseTreeCardClick}
                                               onRootCreate={this.props.onRootCreate}
                                               onRootDelete={this.props.onRootDelete}
                            />)
                }
            </div>
        )
    }
}