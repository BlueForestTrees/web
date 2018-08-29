<template>
    <g v-if="hasItems && hasLeafs">
        <path v-for="(leaf, i, key) in leafs" :key="key" :d="drawBranch(leaf)" fill-opacity="0" stroke="orange" :stroke-width="2"/>        
        <path :d="drawGlobalBush(arrayPath)" fill="green" stroke="green" stroke-width="20" stroke-linejoin="round"/>
        <svg-bush-leaf v-for="(leaf, i, key) in leafs" :key="key" :coor="leaf" :center="center"
         :widthTrunk="widthTrunk" :colorBase="items[i].color" :textItem="qtUnitName(items[i])"/>
    </g>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import {getRandomColor, hasQuantity, qtUnitName, rad} from "../../../services/calculations"
    import QtUnit from "../../common/QtUnit"
    import {qtUnitCoef, grandeur, unit} from "unit-manip"
    import SvgBushLeaf from "./SvgBushLeaf"

    export default {
        name: 'svg-bush',
        components: {
            SvgBushLeaf,
        },
        props: ['tree', 'widthTrunk', 'heightTrunk', 'position'],
        computed: {
            center: function() {
                var objectCenter = {
                    x: this.position.x + ( this.widthTrunk/2),
                    y: this.position.y,
                }
                return objectCenter;
            },
            items: function () {
                return this.impacts
            },
            hasItems: function() {
                return this.items && this.items.length && this.items.length > 0
            },
            impacts: function () {
                return this.tree && this.tree.impacts
            },
            leafs: function() {
                let radius = 30;
                let numNodes = 200;
                let arrayPourcent = this.arrayPourcent(this.items);
                let nodes = [], angle, x, y, i, r;
                for (let i=0; i<=numNodes; i++) {
                    for(let i2=0; i2<arrayPourcent.length; i2++){
                        if(arrayPourcent[i2].middlePoint == i){
                            angle = (i / (numNodes/2)) * Math.PI;
                            x = (radius * Math.cos(angle));
                            y = (radius * Math.sin(angle));
                            r = arrayPourcent[i2].pourcent/2;
                            nodes.push({
                                i: i,
                                x: x + this.position.x + (this.widthTrunk/2),
                                y: y + this.position.y - 70,
                                r: r,
                                });
                        }
                    }
                }
                return nodes;
            },
            hasLeafs: function() {
                return this.leafs && this.leafs.length && this.leafs.length > 0
            },
            arrayPath: function() {
                // Etape 1 : 
                // 1. parcourir le tableau,
                let array3 = this.leafs;
                let nodesPath = [];
                let arrayDist = [];
                for(let i3 = 0; i3 < array3.length; i3++) {
                    // 2. pour chaque point dessiner un cercle en 6 point.
                    let radius = array3[i3].r;
                    let numNodesPath = 6;
                    let angle,
                        x,
                        y,
                        dist,
                        i4;
                    for (let i4=0; i4<numNodesPath; i4++) {
                        angle = (i4 / (numNodesPath/2)) * Math.PI;   
                        x = (radius * Math.cos(angle));
                        y = (radius * Math.sin(angle));
                        dist = this.dist(x + array3[i3].x, this.position.x + (this.widthTrunk/2), y + array3[i3].y, this.position.y  - this.heightTrunk - 60);
                        nodesPath.push({
                            i: i4,
                            x: x + array3[i3].x,
                            y: y + array3[i3].y,
                            dist: dist,
                            });
                        // 3. Comparer ces quatres points au centre
                        arrayDist.push(dist);
                    }
                    // 4. Eliminer le point le plus proche du centre : 
                    //      - sort() : le plus proche >
                    //      - splice()
                    arrayDist.sort(function(a, b) { return a - b; });
                    let short = arrayDist.shift();
                    let shortIndex = nodesPath.findIndex(function(element) { return element.dist == short; });
                    nodesPath.splice(shortIndex, 1);
                }
                return nodesPath;
            },

        },
        methods: {
            qtUnitName, hasQuantity, getRandomColor, unit,
            dist(x1, x2, y1, y2) {
                let powX = Math.pow(x2 -x1, 2);
                let powY = Math.pow(y2 - y1, 2);
                let sqrt = Math.sqrt(powX + powY);
                return sqrt;
            },
            logItem(item) {
                let logItem = Math.round(item.quantity.bqt * 100);
                logItem = Math.log(logItem+2);
                return logItem;
            },
            arrayPourcent(items) {
                let array = [];
                let count = 0;
                let totalQt = this.totalQt(items);
                for( let index = 0;index < items.length; index++){
                    let resultPourcent = this.logItem(items[index]) * 100 / totalQt;
                    // don't want a value == 0
                    // because it will be invisible on the graph
                    if(resultPourcent === 0){
                        resultPourcent = 1;
                        count++;
                    }
                    array.push(Math.round(resultPourcent));
                }
                // Searching for max value
                // to don't exceed the pourcent for the circle (next step)
                let maxValue = Math.max(...array);
                let indexMaxValue = array.indexOf(maxValue);
                array[indexMaxValue] = array[indexMaxValue] - count;
                let result = 0;
                let middle = 0;
                let arrayObjectPourcent = [];
                for( let index2 = 0; index2 < array.length; index2++){
                    middle = result + array[index2];
                    result = result + array[index2]*2;
                    arrayObjectPourcent.push({i: index2, middlePoint: middle, pourcent: array[index2]});
                }
                return arrayObjectPourcent;
            },
            totalQt(items) {
                var accumulator = 0;
                for(let i = 0; i < items.length; i++){
                    let logItem = this.logItem(items[i]);
                    accumulator = accumulator + logItem;
                }
                return accumulator;
            },
            drawGlobalBush: function(array) {
                var d = 'M';
                let count = 0;
                let i = 0;
                if(count===0){
                    d = d + ' ' + array[i].x + ',' + array[i].y;
                    var firstPoint = array.shift();
                    array = this.getClosestPoint(array, firstPoint);
                    count++;
                }
                while(i!=array.length){
                    d = d + ' L ' + array[i].x + ',' + array[i].y;
                    var currentPoint = array.shift();
                    array = this.getClosestPoint(array, currentPoint);
                }
                d = d + ' L  ' + firstPoint.x + ',' + firstPoint.y  + ' Z';
                return d;
            },
            drawBranch(pointD) {
                var d = 'M' + this.center.x + ' ' + this.center.y + ' Q ' + this.center.x + ' ' + pointD.y + ' ' + pointD.x + ' ' + pointD.y;
                return d;
            },
            getClosestPoint(array, currentPoint){
                for(let i = 0; i < array.length; i++) {
                    let distPoint = this.dist(currentPoint.x, array[i].x, currentPoint.y, array[i].y);
                    array[i].dist = distPoint;
                }
                array.sort(function (a, b) { return a.dist - b.dist; });
                return array;
            }
        }
    }
</script>