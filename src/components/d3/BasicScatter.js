import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function BasicScatterPlot(config = {}) {    
    var margin = config.margin || { top: 50, bottom: 100, left: 100, right: 50 },
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
        xAxisCall,
        yAxisCall,
        labels,
        yLines,
        x_axis,
        y_axis,
        xLabel,
        yLabel,
        drawLegend


        x = d3.scaleLinear()
        y = d3.scaleLinear()

        x_axis = d3.axisBottom().ticks(5)
        y_axis = d3.axisLeft().ticks(5)

        var color = d3.scaleOrdinal()
            .domain(["setosa", "versicolor", "virginica" ])
            .range([ "#118ab2", "#ffd166", "#ef476f"])

    function chart(selection){
        selection.each(function() { 
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            
            xAxisCall = chartArea.append('g')
                // .attr('transform', 'translate(0,' + height + ')')
                .attr('class', 'axis axis--x')

            yAxisCall = chartArea.append('g')
                .attr('class', 'axis, axis--y')

            yLines = chartArea.append('g')
                .attr('class', 'grid')

            labels = chartArea.append('g')

            xLabel = labels.append("text")
                .attr("font-size", "20px")
                .attr("text-anchor", "middle")
                .text(config.labels.x)
                .attr("y", 70)
                .attr("x", 0)

            yLabel = labels.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "20px")
                .attr("text-anchor", "middle")
                .text(config.labels.y)
                .attr("y", -70)
                .attr("x", -170)

            
            updateScales = (ticks) => {
                x
                    .range([0, width])
                    .domain(config.domain.x)
                y
                    .range([height, 0])
                    .domain(config.domain.y)

                x_axis.scale(x)
                y_axis.scale(y)
                xAxisCall
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(x_axis)

                yAxisCall.call(y_axis)

                xLabel
                    .attr('transform', 'translate(' + (width/2) + "," + height + ")")
                    .text(config.labels.x)
                yLabel
                    .attr('x', -height/2)
                    .text(config.labels.y)
                
                    drawLegend();
            }        

            drawLegend = () => {
                if (!firstRender) return; 
                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + (width - 100) + "," + (height - 100) + ")")

                let circleSize = 8
                color.domain().forEach(function(d, i){
                    let tmp = legend.append('g')
                        .attr('transform', 'translate(0,' + (30 * i) + ")")
                    
                    tmp.append('circle')
                        .attr('cx', 0)
                        .attr('cy', 0)
                        .attr('fill', color.range()[i])
                        .attr('stroke', '#000')
                        .attr('r', circleSize)

                    tmp.append('text')
                        .attr('x', circleSize + 7)
                        .attr('y', 0)
                        .attr('font-size', '14px')
                        .attr('dominant-baseline', 'middle')
                        .text(d)
                        
                })

            }

            drawChart = (resizing = false) =>{
                if (!width || !height) return;

                let dots = chartArea.selectAll('.dots')
                    .data(data, d=> d.id)

                dots.exit().remove()

                dots.enter()
                    .append('circle')
                    .attr('class', 'dots')
                    .attr("cx", function (d) { return x(d.sepal_length); } )
                    .attr("cy", function (d) { return y(d.petal_length); } )
                    .attr("r", 8)
                    .style("fill", function (d) { return color(d.species) } )
                    .attr('fill-opacity', 0.8)
                    .attr('stroke', '#000')

                firstRender = false        
            }   


        });
    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        drawChart(false);

        return chart;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        x.range([0, width])
        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        y.range([height, 0])
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