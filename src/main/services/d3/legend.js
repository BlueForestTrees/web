import {config} from "./config";
import * as d3 from "d3";


export const legend = ({selectAxis, id, data, options}) => {

    const cfg = config(options);

    const svg = d3.select(id).append("svg");
    const g = svg.append("g");



    /////////////////////////////////////////////////////////
    /////////////////// Draw the Legend /////////////////////
    /////////////////////////////////////////////////////////

    // svg.append("g")
    //     .attr("class", "legendOrdinal")
    //     .attr("transform", "translate(" + cfg["legendPosition"]["x"] + "," + cfg["legendPosition"]["y"] + ")");

    // d3 symbol creates a path-string, for example
    // "M0,-8.059274488676564L9.306048591020996,
    // 8.059274488676564 -9.306048591020996,8.059274488676564Z"
    //
    // const legendOrdinal = d3.legend.color()
    //     .shape("path", d3.svg.symbol().type("triangle-up").size(150)())
    //     .shapePadding(10)
    //     .scale(cfg.color)
    //     .labels(cfg.color.domain().map((d) => {
    //         console.log(d);
    //         return "salur";
    //     })
    //     .on("cellover", function (d) {
    //         cellover(d);
    //     })
    //     .on("cellout", function (d) {
    //         cellout();
    //     }));
    //
    // svg.select(".legendOrdinal")
    //     .call(legendOrdinal);

    /*function(d){
            return data[d][0][areaName];
        })*/
};