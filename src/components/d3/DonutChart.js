import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function DonutChart(config = {}) {    
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
        drawLegend

        pie = d3.pie()
            .value(function(d){ return d.value})

        const colors = d3.scaleOrdinal()
            .range(config.colors)

    function chart(selection){
        selection.each(function() { 
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')
            chartArea = svg.append('g').attr('id', 'chart-' + id)

            
            
            updateScales = (ticks) => {
                colors.domain(data.map(d=> d.name))
                chartArea.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
                radius = Math.min(width, height) * 0.4
                drawLegend();
            }        

            drawChart = (resizing = false) =>{
                if (!width || !height) return;
                let donutData = pie(data)
                let slices = chartArea.selectAll('.slices')
                    .data(donutData, d=> d.data.name)

                slices.enter()
                    .append('path')
                    .attr('class', 'slices')
                    .attr('d', d3.arc()
                        .innerRadius(radius - 100)
                        .outerRadius(radius)
                    )
                    .attr('fill', d=> colors(d.data.name))

                firstRender = false
            }   

            drawLegend = () => {
                if (!firstRender) return; 
                var legend = chartArea.append('g')
                    .attr('transform', 'translate(' + (radius + 60) + "," + (-radius) + ")")
                chartArea.append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('font-size', "50px")
                    .attr('font-weight', 700)
                    .text(d3.sum(data, d=> d.value))
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                let rectSize = 30
                data.forEach(function(d, i){
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
                        .text(d.name)

                })
            }
        });
    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value.sort(function(a, b){
            return d3.descending(a.value, b.value)
        });
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