import IdQtUnitName from "domain/model/IdQtUnitName";
import Root from "domain/model/Root";
export default class Tree{
    idQtUnitName: IdQtUnitName;
    roots: Array<Root>;

    IdQtUnitName(idQtUnitName:IdQtUnitName) : Tree{
        this.idQtUnitName = idQtUnitName;
        return this;
    }

    Roots(roots:Array<Root>) : Tree{
        this.roots = roots;
        return this;
    }
}