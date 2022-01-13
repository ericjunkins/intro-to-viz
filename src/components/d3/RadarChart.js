import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

import { getSize } from "./../../helpers/FontSizes";

export default function RadarChart(config = {}) {    
    var margin = config.margin || { top: 50, bottom: 50, left: 50, right: 50 },
        // width = config.width ? config.width - margin.left - margin.right : 900 - margin.left - margin.right,
        // height = config.height ? config.height - margin.top - margin.bottom : 900 -margin.top - margin.bottom,
        height = config.height,
        width = config.width,
        id = config.id,
        data = config.data ? config.data : [],
        svg,
        drawChart,
        updateScales,
        x,
        y,
        chartArea,
        firstRender = true,
        pie,
        radius,
        drawLegend,
        drawBackground,
        mouseover,
        mouseout,
        size=config.size


        // size = getSize(config.width)

        pie = d3.pie()
            .value(function(d){ return d.value})

        let ticks = [1,2,3,4,5]

        let line = d3.line()
            .x(d=> d.x)
            .y(d=> d.y)
        
        let radialScale = d3.scaleLinear()

        const colors = d3.scaleOrdinal()
            .domain(config.groups)
            .range(config.colors)

        const groups = config.groups

    function chart(selection){
        selection.each(function() { 
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')
            chartArea = svg.append('g').attr('id', 'chart-' + id)

            
            
            updateScales = (ticks) => {
                chartArea.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
                radius = Math.min(width, height) * 0.35
                radialScale
                    .domain([0, 5])
                    .range([20, radius])
                
                data.data.forEach(function(v){
                    v.data.forEach(function(d, i){
                        d.radius = radialScale(d.value)
                        d.angle = (Math.PI / 2) + ( 2 * Math.PI * i / data.traits.length)
                        let coords = angleToCoordinate(d.angle, d.value)
                        d.x = coords.x
                        d.y = coords.y
                    })
                })
                
                // drawLegend();
                drawBackground();

            }        

            drawChart = (resizing = false) =>{
                if (!width || !height) return;
                if (!firstRender) return;

                data.data.forEach(function(v, i){
                    var paths = chartArea.selectAll('.skill-path')
                        .data([data.data[i].data], d=> d.label)

                    paths.enter()
                        .append('path')
                        .attr('d', line)
                        .attr('class', 'spider-path')
                        .attr('id', 'path-' + i)
                        .attr('stroke', colors(config.groups[i]))
                        .attr('fill', colors(config.groups[i]))
                        .attr('fill-opacity', 0.25)
                        .on('mouseover', mouseover)
                        .on('mouseout', mouseout)

                    chartArea.append('line')
                        .attr('x1', data.data[i].data[0].x)
                        .attr('x2', data.data[i].data[data.traits.length -1].x)
                        .attr('y1', data.data[i].data[0].y)
                        .attr('y2', data.data[i].data[data.traits.length -1].y)
                        .attr('class', 'spider-path')
                        .attr('stroke', colors(config.groups[i]))
                        .attr('fill', 'none')

                        var dots = chartArea.selectAll('.dots')
                            .data(data.data[i].data, d=> d.label)
                
                        dots.enter()
                            .append('circle')
                            .attr('class', 'spider-dots')
                            .attr('cx', d=> d.x)
                            .attr('cy', d=> d.y)
                            .attr('r',  5)
                            .attr('stroke', colors(config.groups[i]))
                
                })

                firstRender = false
            }   

            drawBackground = () => {
                if (!firstRender) return;
                var circles = chartArea.selectAll('.circles')
                    .data(ticks)
        
                circles.enter()
                    .append('circle')
                    .attr('class', 'spider-circles')
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', d=> radialScale(d))

                var lines = chartArea.selectAll('.spider-lines')
                    .data(data.data[0].data, d=> d.label)
                lines.enter()
                    .append('line')
                    .attr('class', 'spider-lines')
                    .attr('x1', d=> angleToCoordinate(d.angle, 5.4).x)
                    .attr('y1', d=> angleToCoordinate(d.angle, 5.4).y)
                    .attr('x2', 0)
                    .attr('y2', 0)
                    .attr('id', function(d){
                    })

                var texts = chartArea.selectAll('.labels-text')
                    .data(data.data[0].data, d=> d.label)

                texts.enter()
                    .append('text')
                    .attr('x', d=> angleToCoordinate(d.angle, 5.8).x)
                    .attr('y', d=> angleToCoordinate(d.angle, 5.8).y)
                    .attr('text-anchor', d=> d.anchor)
                    .attr('class', 'label-text-' + size)
                    .attr('font-weight', 500)
                    .text(d=> d.label)

            }

            drawLegend = () => {
                if (!firstRender) return; 
                var legend = chartArea.append('g')
                    .attr('transform', 'translate(' + (radius + 60) + "," + (radius/2 + 30) + ")")
                
                let rectSize = 30
                groups.forEach(function(d, i){
                    let tmp = legend.append('g')
                        .attr('transform', 'translate(0,' + (i * (rectSize * 1.5)) + ")")

                    tmp.append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('height', rectSize)
                        .attr('width', rectSize)
                        .attr('fill', colors.range()[i])
                        .attr('stroke', '#000')
                    
                    tmp.append('text')
                        .attr('x', rectSize + 10)
                        .attr('y', rectSize /2)
                        .attr('class', 'legend-text')
                        .attr('dominant-baseline', 'middle')
                        .text(d)

                })
            }

            mouseover = (d) => {
                d3.selectAll('.spider-path')
                    .attr('fill-opacity', 0.05)

                d3.select("#" + d.target.id)
                    .attr('fill-opacity', 0.35)
                
            }

            mouseout = () => {
                d3.selectAll('.spider-path')
                    .attr('fill-opacity', 0.25)
            }
        });
    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        // data = value.sort(function(a, b){
        //     return d3.descending(a.value, b.value)
        // });
        drawChart(false);

        return chart;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    }

    chart.size = function(w, h){
        if (!arguments.length) return {width: width, height: height}
        chart.width(w - margin.left - margin.right);
        chart.height(h - margin.top - margin.bottom);
        updateScales();
        if (firstRender) {   
            drawChart(true);
        }
        return chart;
    }

    const angleToCoordinate = (angle, value) => {
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": x, "y": - y}
    }
    
    const getPathCoordinates = (data_point) => {
        let coordinates = [];
        for (var i =0; i < data.length; i++){
            let ft_name = data[i];
            let angle = (Math.PI /2) + (2 * Math.PI * i / this.features.length);
            coordinates.push(this.angleToCoordinate(angle, data_point[ft_name]))
        }
        return coordinates;
    }

    return chart;
}