import React from "react";
import evt from "util/EventManager";
import adminTreesRestService from "rest/AdminTreesRestService";
import Event from "util/Event";
import logger from "component/LogComponent";
import {Dialog, FlatButton} from "material-ui";

export default class AdminComponent extends React.Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    closeAndDelete = () => {
        this.handleClose();
        this.deleteAll();
    };

    deleteAll = () => {
        adminTreesRestService.deleteAll()
            .then(()=>{evt.on(Event.TREE_ALL_DELETED)});
    };

    onListAllByClick = () => {
        adminTreesRestService.listAll()
            .then(()=>{logger.debug("listAll")});
    };

    render() {

        const actions = [
            <FlatButton label="Je me calme" primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label="VIDER LA BASE" primary={true} onTouchTap={this.closeAndDelete}/>
        ];

        return <div className='btn-group' role='group'>
            <button onClick={this.handleOpen} type='button' className='btn btn-secondary'>Tout supprimer</button>
            <button onClick={this.onListAllByClick} type='button' className='btn btn-secondary'>Tout lister</button>

            <Dialog title="Sûr?" actions={actions} open={this.state.open}>
                Cela va vider TOUTE la base
            </Dialog>
        </div>
    }

}