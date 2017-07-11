import React, {Component} from "react";
import mapper from "service/MapperService";
import ns from "service/NumberService";
import IdQtUnitName from "../domain/model/IdQtUnitName";
import {Chip} from "material-ui";

export default class TankComponent extends Component {

    render = () => {
        const raws : Array<IdQtUnitName> = Object.values(mapper.toRaws(this.props.trees));
        return <div className="row">
            {
                raws.map((raw:IdQtUnitName) => {
                    const qt: number = ns.round(raw.qt / raw.unit.coef);
                    const unitName:String = raw.unit.shortName;
                    const rawName:String = raw.name;

                    return <Chip key={raw.id}>
                        {qt}{unitName} {rawName}
                    </Chip>

                })
            }
        </div>;
    };

}