export default class RequantifiedTrunkRequestDTO{
    id:number;
    qt:number;
    unitShortName:String;

    Id = (id:number) => {
        this.id = id;
        return this;
    };

    Qt = (qt:number)=>{
        this.qt = qt;
        return this;
    };

    UnitShortName = (unitShortName:String)=>{
        this.unitShortName = unitShortName;
        return this;
    };
}