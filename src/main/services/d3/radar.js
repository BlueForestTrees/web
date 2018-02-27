import * as d3 from 'd3';
import _ from 'lodash';
import {config} from "./config";
import {wrap} from "./helper";
import {format} from "../calculations";
import {bestQuantity} from "../unitService";

export const drawRadar = ({selectAxis, id, data, options, selectedAxis}) => {

    const cfg = config(options);

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = Math.max(cfg.maxRatio, d3.max(data, function (i) {
        return d3.max(i.map(function (o) {
            return o.ratio;
        }))
    }));

    var axisNames = _.map(data[0], 'axis'),        //Names of each axis
        total = axisNames.length,					//The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), 	//Radius of the outermost circle
        angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Remove whatever chart with the same id/class was present before
    d3.select(id).select("svg").remove();

    //Initiate the radar chart SVG
    var svg = d3.select(id).append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "radar" + id)
        .attr("viewBox", "-100 -50 700 700");
    //Append a g element
    var g = svg.append("g")
        .attr("transform", "translate(" + (cfg.w / 2) + "," + (cfg.h / 2) + ")");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    var filter = g.append('defs').append('filter').attr('id', 'glow'),
        feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
        feMerge = filter.append('feMerge'),
        feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
        feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisGrid");

    //Draw the background circles
    axisGrid.selectAll(".levels")
        .data(d3.range(1, (cfg.levels + 1)).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function (d, i) {
            return radius / cfg.levels * d;
        })
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles)
        .style("filter", "url(#glow)");

    //Text indicating at what % each level is
    axisGrid.selectAll(".axisLabel")
        .data(d3.range(1, (cfg.levels + 1)).reverse())
        .enter().append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", function (d) {
            return -d * radius / cfg.levels;
        })
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(function (d, i) {
            return format(maxValue * d / cfg.levels);
        });

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
        .data(axisNames)
        .enter()
        .append("g")
        .attr("class", "axis");
    //Append the lines
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("y2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");


    const axisLabel = axis => axis !== selectedAxis ?
        axis
        :
        `${axis}: ${bestQuantity(_.find(data[0], {axis})).qt}${bestQuantity(_.find(data[0], {axis})).unit}`;
    //Append the labels at each axis
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "1.3em")
        .style("font-weight", (e) => (e === selectedAxis ? "bold" : "normal"))
        .style("cursor", "hand")
        .attr("text-anchor", "middle")
        .attr("dy", "0em")
        .attr("x", function (d, i) {
            return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("y", function (d, i) {
            return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .text(axisName => axisLabel(axisName))
        .on('click', (axisName) => {
            selectAxis(axisName);
        })
        .call(wrap, cfg.wrapWidth);


    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3.lineRadial()
        .curve(d3.curveCardinalClosed)
        .radius(function (d) {
            return rScale(d.ratio);
        })
        .angle(function (d, i) {
            return i * angleSlice;
        });

    //Create a wrapper for the blobs
    var blobWrapper = g.selectAll(".radarWrapper")
        .data(data)
        .enter().append("g")
        .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("fill", function (d, i) {
            return cfg.color[i];
        })
        .style("fill-opacity", cfg.opacityArea);

///////////////////////////////////////////////////////
////// Append circles + invisible circles for tooltip /
///////////////////////////////////////////////////////
//Append the circles
    blobWrapper.selectAll(".radarCircle")
        .data(function (d, i) {
            return d;
        })
        .enter().append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function (d, i) {
            return rScale(d.ratio) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
            return rScale(d.ratio) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", function (d, i, j) {
            return 0;
        })
        .style("fill-opacity", 0.1);

//Wrapper for the invisible circles on top
    var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
        .data(data)
        .enter().append("g")
        .attr("class", "radarCircleWrapper");

    const overPoint = d => `${d.tree}: ${bestQuantity(d).qt}${bestQuantity(d).unit} ${d.axis}`;

//Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
        .data(function (d, i) {
            return d;
        })
        .enter().append("circle")
        .attr("class", "radarInvisibleCircle")
        .attr("r", cfg.dotRadius * 6)
        .attr("cx", function (d, i) {
            return rScale(d.ratio) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
            return rScale(d.ratio) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function (d, i) {
            const newX = parseFloat(d3.select(this).attr('cx')) - 10;
            const newY = parseFloat(d3.select(this).attr('cy')) - 10;

            tooltip
                .attr('x', newX)
                .attr('y', newY)
                .text(overPoint(d))
                .transition().duration(200)
                .style('opacity', 1);
        })
        .on("mouseout", function () {
            tooltip.transition().duration(200)
                .style("opacity", 0);
        });

//Set up the small tooltip for when you hover over a circle
    var tooltip = g.append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);


};