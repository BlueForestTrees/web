import React, {Component} from "react";
import TrunkComponent from "component/TrunkComponent";
import {Paper} from "material-ui";
import Tree from "domain/model/Tree";

export default class TreeCardComponent extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const trunk:Tree = this.props.tree;
        const trunkId = trunk.idQtUnitName.id;
        return (
            <Paper zDepth={3} key={trunkId}>
                <TrunkComponent trunk={trunk}
                                onCloseClick={this.props.onCloseClick.bind(null, trunk)}
                                onRootCreate={this.props.onRootCreate}
                                onRootDelete={this.props.onRootDelete}
                                onChange={this.props.onChange}/>
            </Paper>
        )
    }

}