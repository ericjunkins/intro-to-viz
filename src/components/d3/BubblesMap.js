import * as d3 from "d3";
import * as d3Collection from 'd3-collection';
import * as topojson from "topojson";
import * as d3GeoVoronoi from "d3-geo-voronoi";

export default function BubblesMapChart(config = {}) {    
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

        const colorScale = d3.scaleOrdinal()
            .range(d3.schemePaired);

        let projection = d3.geoMercator()
            .scale(config.position.scale)
            .center(config.position.center)

        let area = d3.scaleSqrt()
            .range(config.area)

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
                
                colorScale.domain(data.data.map(d => d.homecontinent))
                const valueExtent = d3.extent(data.data, d=> d.n)
                area.domain(valueExtent)
                drawLegend();
            }        

            drawChart = (resizing = false) =>{
                updateScales();
                if (!firstRender || !Object.keys(data).length) return; 
                chartArea.append("g")
                    .selectAll("path")
                    .data(data.topo.features)
                    .join("path")
                    .attr("fill", "#b8b8b8")
                    .attr("d", d3.geoPath()
                        .projection(projection)
                    )
                    .style("stroke", "none")
                    .style("opacity", .3)
                
                svg
                    .selectAll("myCircles")
                    .data(data.data.sort((a,b)=> b.n - a.n).filter((d, i) => i<1000))
                    .join("circle")
                        .attr("cx", d => projection([d.homelon, d.homelat])[0])
                        .attr("cy", d => projection([d.homelon, d.homelat])[1])
                        .attr("r", d => {
                            return area(d.n)
                        })
                        .style("fill", d => colorScale(d.homecontinent))
                        .attr("stroke", d=> {if (d.n>1000) {return "black"} else {return "none"}  })
                        .attr("stroke-width", 1)
                        .attr("fill-opacity", .5)
                        .attr('class', 'map-bubble')
                        .on("mouseover", mouseover )
                        .on("mouseleave", mouseout )
                        

                firstRender = false
            }

            function mouseover(d){
                d3.selectAll(".map-bubble")
                    .style("opacity", .2)
                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "black")
            }

            function mouseout(d){
                d3.selectAll(".map-bubble")
                    .style("opacity", 1)
            }

            function drawLegend(){
                if (!Object.keys(data).length || !height) return; 
                const valuesToShow = (size === 'sm' ? [500, 10000, 30000] : [1000,10000,25000])
                const xCircle = 0
                const xLabel = (size === 'sm' ? 40 : 60)
                let offHeight = size === 'sm' ? height + 30 : height
                let offWidth = size === 'sm' ? 30 : 60

                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + offWidth + "," + (offHeight) + ")")

                legend
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("circle")
                    .attr("cx", xCircle)
                    .attr("cy", d => {
                        return  -area(d)})
                    .attr("r", d => area(d))
                    .style("fill", "none")
                    .attr("stroke", "black")

                // Add legend: segments
                legend
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("line")
                    .attr('x1', d => area(d))
                    .attr('x2', xLabel)
                    .attr('y1', d =>  - area(d))
                    .attr('y2', d =>  - area(d))
                    .attr('stroke', 'black')
                    .style('stroke-dasharray', ('2,2'))

                // Add legend: labels
                legend
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("text")
                    .attr('x', xLabel)
                    .attr('y', d =>  - area(d))
                    .text(d => (d/1000) + " K")
                    .attr('class', 'label-text-' + size)
                    .attr('alignment-baseline', 'middle')
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