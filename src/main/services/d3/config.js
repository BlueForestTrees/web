import * as d3 from "d3";

export const config = options => {
    const def = {
        w: 500,				//Width of the circle
        h: 500,				//Height of the circle
        levels: 4,				//How many levels or inner circles should there be drawn
        maxRatio: 1, 			//What is the coef that the biggest circle will represent
        labelFactor: 1.20, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, 	//The opacity of the area of the blob
        dotRadius: 4, 			//The size of the colored circles of each blog
        opacityCircles: 0.1, 	//The opacity of the circles of each blob
        strokeWidth: 2, 		//The width of the stroke around each blob
        color: 45, //d3.scaleOrdinal(d3.schemeCategory10)	//Color function
        legendPosition: {x: 20, y: 20}
    };

    //merge options into cfg
    if ('undefined' !== typeof options) {
        for (var i in options) {
            if ('undefined' !== typeof options[i]) {
                def[i] = options[i];
            }
        }
    }

    return def;

};