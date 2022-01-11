import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function ChordDiagram(config = {}) {    
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
        radius,
        drawLegend,
        res, 
        groupTicks,
        labels = config.labels,
        diffs = config.diffs,
        mouseover,
        mouseout,
        defaultOpacity = config.defaultOpacity

    function chart(selection){
        selection.each(function() { 
            var colors = [ "#460b63", "#094f99", "#38b000", "#ffbd00", "#f54ed9"]
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)

            updateScales = (ticks) => {
                chartArea.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
                radius = Math.min(width, height) * 0.45
                res = d3.chord()
                    .padAngle(0.05)
                    .sortSubgroups(d3.descending)
                    (data)

            }        

            drawChart = (resizing = false) =>{
                let outerPadding = 20
                let thickness = 20
                if (!width || !height) return;
                chartArea
                    .datum(res)
                    .append("g")
                    .selectAll("g")
                    .data(function(d) { return d.groups; })
                    .enter()
                    .append("g")
                    .attr('id', 'path-group')
                    .append("path")
                    .style("fill", "grey")
                    .style("fill", function(d,i){ return colors[i] })
                    .attr("id",function(d,i){return "group"+i;})
                    .style("stroke", "black")
                    .style('stroke-width', 2)
                    .attr("d", d3.arc()
                        .innerRadius(radius - outerPadding - thickness)
                        .outerRadius(radius - outerPadding )
                    )
              
              // Add the links between groups
              chartArea
                    .datum(res)
                    .append("g")
                    .selectAll("path")
                    .data(function(d) { return d; })
                    .enter()
                    .append("path")
                    .attr("d", d3.ribbon()
                        .radius(radius - outerPadding - thickness - 5)
                    )
                    
                    .style("fill", function(d){ return(colors[d.source.index]) })
                    .style('stroke-width', 2)
                    .style('opacity', defaultOpacity)
                    .style("stroke", "black")
                    .attr('class', 'chord-path')
                    .attr('id', d=> 'chord-' + d.source.index)
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout)


                chartArea.selectAll("text")
                    .data(res.groups)
                    .enter().append("text")
                    .attr("dx", (d,i)=> diffs[i])
                    .attr("dy", -45)
                    .append("textPath")
                        .attr("class", "label")
                        .attr("xlink:href", function(d) { return "#group" + d.index; })
                        .text(function(d, i) { return labels[i] })
                        .style("fill",  "#000");

                var group = chartArea
                    .datum(res)
                    .append("g")
                    .selectAll("g")
                    .data(function(d) { return d.groups; })
                    .enter()
                  
                
                // // Add the ticks
                group
                    .selectAll(".group-tick")
                    .data(function(d) { return groupTicks(d, 5); })    // Controls the number of ticks: one tick each 25 here.
                    .enter()
                    .append("g")
                      .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + (radius - outerPadding) + ",0)"; })
                    .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
                        .attr("x2", 6)
                        .attr("stroke", "black")
                  
                //   // Add the labels of a few ticks:
                group
                    .selectAll(".group-tick-label")
                    .data(function(d) { return groupTicks(d, 5); })
                    .enter()
                    .filter(function(d) { return d.value % 5 === 0; })
                    .append("g")
                      .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + (radius - outerPadding) + ",0)"; })
                    .append("text")
                        .attr("x", 8)
                        .attr("dy", ".35em")
                        .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
                        .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
                        .text(function(d) { return d.value })
                        .style("font-size", 12)



                firstRender = false
            }   

            mouseover = (event, d) => {
                d3.selectAll('.chord-path')
                    .style('opacity', 0.05)

                d3.selectAll('#' + event.target.id)
                    .style('opacity', defaultOpacity)
                // console.log(d)
            }

            mouseout = (event, d) => {
                d3.selectAll('.chord-path')
                    .style('opacity', defaultOpacity)
            }
            drawLegend = () => {
            }

            groupTicks = (d, step) => {
                var k = (d.endAngle - d.startAngle) / d.value;
                return d3.range(0, d.value, step).map(function(value) {
                  return {value: value, angle: value * k + d.startAngle};
                });
            }
        });
    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value
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

    return chart;
}