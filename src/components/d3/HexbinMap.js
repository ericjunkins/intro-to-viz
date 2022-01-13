import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function HexbinMap(config = {}) {    
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
        drawLegend,
        getBinnedColors,
        bins = config.bins,
        colors = config.colors,
        position = config.position,
        size= config.size

        let color = d3.scaleLinear()
            .domain([-0.2, 0.2])
            .range(config.colors)

    

        var projection = d3.geoMercator()
            .scale(position.scale) // This is the zoom
            .translate(position.translate); // You have to play with these values to center your map

        var path = d3.geoPath()
            .projection(projection)

    function chart(selection){
        selection.each(function() { 
            
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)

            updateScales = (ticks) => {
                drawLegend();
            }        

            drawChart = (resizing = false) =>{
                if (!firstRender) return; 

                chartArea.append("g")
                    .selectAll("path")
                    .data(data)
                    .enter()
                    .append("path")
                        // .attr("fill", d=> getBinnedColors(d.properties.affiliation))
                        .attr('fill', d=> {
                            if (d.properties.affiliation <= color.domain()[0]) return color.range()[0]
                            else if (d.properties.affiliation >= color.domain()[color.domain().length -1]) return color.range()[color.domain().length -1]
                            else if (d.properties.affiliation <= 0.03 && d.properties.affiliation >= -0.03) return config.nuetral
                            else return color(d.properties.affiliation)
                        })
                        .attr("d", path)
                        .attr("stroke", "#000")
                        .attr('stroke-width', 2)
            
                // // Add the labels
                chartArea.append("g")
                    .selectAll("labels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", function(d){return path.centroid(d)[0]})
                    .attr("y", function(d){return path.centroid(d)[1]})
                    .text(function(d){ return d.properties.iso3166_2})
                    .attr("text-anchor", "middle")
                    .attr("alignment-baseline", "central")
                    .attr('class', 'hexbin-text-' + size)
                    .style("fill", d=> {
                        return (d.properties.affiliation <= 0.03 && d.properties.affiliation >= -0.03 ? "#000" : "#fff") 
                    })

                firstRender = false
            }   

            drawLegend = () => {
                chartArea.append('g').append('text')
                    .attr('text-anchor', 'middle')
                    .attr('class', 'title-text-' + size)
                    .attr('x', width/2 + margin.left)
                    .attr('y', 100)
                    .text('2020 Presedential Election Results')
                
                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + height + ')')

                var defs = svg.append('defs')
                var linearGradient = defs.append('linearGradient')
                    .attr('id', 'linear-gradient')

                let padding = 0.1;
                var x = d3.scaleLinear()
                    .domain([-0.2, 0.2])
                    .range([width * padding, width * (1 - padding)])

                var rectH = size === 'sm' ? 15 : 30
                linearGradient
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "0%");
                
                linearGradient.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", colors[0]); //light blue
                
                //Set the color for the end (100%)
                linearGradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", colors[1]); //dark blue
                
                legend.append('rect')
                    .attr('x', x(-0.2))
                    .attr('y', 0)
                    .attr('width', x.range()[1] - x.range()[0])
                    .attr('height', rectH)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                    .style('fill', "url(#linear-gradient)");
                
                legend.append('rect')
                    .attr('x', x(-0.03))
                    .attr('width', x(0.03) - x(-0.03))
                    .attr('height', rectH)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                    .attr('y', 0)
                    .attr('fill', config.nuetral)
                
                legend.append('line')
                    .attr('x1', x(0))
                    .attr('x2', x(0))
                    .attr('y1', rectH)
                    .attr('y2', rectH + 15)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                
                legend.append('line')
                    .attr('x1', x(0.2))
                    .attr('x2', x(0.2))
                    .attr('y1', rectH)
                    .attr('y2', rectH + 15)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                
                legend.append('line')
                    .attr('x1', x(-0.2))
                    .attr('x2', x(-0.2))
                    .attr('y1', rectH)
                    .attr('y2', rectH + 15)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)

                legend.append('text')
                    .attr('x', x(0.2) )
                    .attr('y', rectH + 30)
                    .attr('text-anchor', 'end')
                    .attr('class', 'hexbin-text-' + size)
                    .text('Very Republican')

                legend.append('text')
                    .attr('x', x(-0.2) - 3)
                    .attr('y', rectH + 30)
                    .attr('text-anchor', 'start')
                    .attr('class', 'hexbin-text-' + size)
                    .text('Very Democratic')
                    
                legend.append('text')
                    .attr('x', x(0))
                    .attr('y', rectH + 30)
                    .attr('class', 'hexbin-text-' + size)
                    .attr('text-anchor', 'middle')
                    .text('Close (<0.3%)')
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