import * as d3 from "d3";
import * as d3Collection from 'd3-collection';
import * as topojson from "topojson";
import * as d3GeoVoronoi from "d3-geo-voronoi";

export default function ColorMapChart(config = {}) {    
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
        position = config.position,
        size= config.size

        const colorScale = d3.scaleThreshold()
            .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
            .range(d3.schemeGnBu[7])
            // .range(d3.scheme)
            // .range(['#00429d', '#3761ab', '#5681b9', '#73a2c6', '#93c4d2', '#b9e5dd', '#ffffe0'].reverse())

        let projection = d3.geoMercator()
            .scale(config.position.scale)
            .center(config.position.center)


        var path = d3.geoPath()

    function chart(selection){
        selection.each(function() { 
            
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)

            

            updateScales = (ticks) => {
               projection.translate([width /2, height /2])
               path.projection(projection)
               drawLegend();
            }        

            drawChart = (resizing = false) =>{
                if (!firstRender || !Object.keys(data).length) return; 

                chartArea.append("g")
                    .selectAll('path')
                    .data(data.topo.features)
                    .enter()
                    .append('path')
                        .attr("d", d3.geoPath()
                            .projection(projection)
                        )
                        .attr('fill', function(d){
                            let ele = data.pop.filter(v=> v.code === d.id)
                            return colorScale(ele.length ? ele[0].pop : 0)
                        })
                        .attr('stroke', '#252525')
                        .attr('stroke-width', 1)
                        .attr("class", function(d){ return "Country" } )
                        .style("opacity", 1)
                        .on("mouseover", mouseover )
                        .on("mouseleave", mouseout )

                firstRender = false
            }

            function mouseover(d){
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", .5)
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "black")
            }

            function mouseout(d){
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                d3.select(this)
                    .transition()
                    .duration(200)
            }

            function drawLegend(){
                let offHeight = size === 'sm' ? height/2 + 80 : height/2 + 150

                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + 20 + "," + (offHeight) + ")")

                let rectSize = size === 'sm' ? 12 : 15

                colorScale.domain().forEach(function(d, i){
                    let tmpG = legend.append('g')
                        .attr('transform', 'translate(' + 0 + "," + ((rectSize + (size === 'sm' ? 2: 5)) * i) + ")")

                    tmpG.append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', rectSize)
                        .attr('height', rectSize)
                        .attr('stroke', '#000')
                        .attr('stroke-width', 1)
                        .attr('fill', colorScale(d))

                    tmpG.append('text')
                        .attr('x', rectSize + 10)
                        .attr('y', rectSize/2)
                        .attr('dominant-baseline', 'middle')
                        .attr('class', 'label-text-' + size)
                        .text((d/1000000) + " M")
                })
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