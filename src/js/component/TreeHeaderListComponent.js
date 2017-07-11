import React, {Component} from "react";
import {Chip} from "material-ui";

export default class TreeHeaderListComponent extends Component {
    render() {
        return (
            <div>
                {this.props.treeHeaderList ? (
                        this.props.treeHeaderList.map((treeHeader) => (
                            <Chip key={treeHeader.id}
                                  onRequestDelete={this.props.onDeleteTree.bind(null, treeHeader.id)}
                                  onTouchTap={this.props.onSelectTree.bind(null, treeHeader.id)}>
                                {treeHeader.name}
                            </Chip>
                        ))
                    ) : ('')}
            </div>
        )
    }
}