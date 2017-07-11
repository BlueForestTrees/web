import React, {Component} from "react";
import AutoComplete from "material-ui/AutoComplete";
import autocomplete from "util/autocomplete";
import treesService from "rest/TreesService";
import mapper from "service/MapperService";
import AutocompleteTree from "domain/autocomplete/AutocompleteTree";

export default class LookupComponent extends Component {

    state = {
        datasource: [],
        text: ""
    };

    onUpdateInput = (input: string, datasource, params) => {
        if (params.source === 'change') {
            autocomplete(input)
                .then(this.setAutocompletion);
        }
        this.setText(input);
    };

    setText = (text: string) => {
        this.setState({text: text});
    };

    setAutocompletion = (datasource) => {
        this.setState({datasource: datasource})
    };

    onNewRequest = (req: string, index: number) => {
        this.onSelect(this.state.datasource[index])
    };

    onSelect = (selection: AutocompleteTree) => {
        if (selection instanceof AutocompleteTree) {
            const trunkExist: Boolean = selection.trunkHeaderDTO;
            if (trunkExist) {
                mapper.toRequantifiedTrunkRequestDTO(selection)
                    .then(treesService.getRequantifiedTrunk)
                    .then(mapper.toTree)
                    .then(this.props.onTreeLookup);
            } else {
                mapper.toTrunkCreationDTO(selection)
                    .then(treesService.createTrunk)
                    .then(mapper.toTree)
                    .then(this.props.onTreeLookup);
            }
            this.setText('');
        }
    };

    focus = () => {
        this.autocomplete.focus();
    };

    render() {
        return <div>
            <AutoComplete
                searchText={this.state.text}
                ref={ac => this.autocomplete = ac}
                hintText="Créer... (ex. 10g chocolat)"
                dataSource={this.state.datasource}
                dataSourceConfig={{"text": "text", "value": "value"}}
                onNewRequest={this.onNewRequest}
                onUpdateInput={this.onUpdateInput}
                filter={AutoComplete.noFilter}
            />
        </div>
    }
}