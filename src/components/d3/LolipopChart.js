import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function LolipopChart(config = {}) {    
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
        yLabel,
        labels,
        xLabel,
        yLines,
        x_axis,
        y_axis,
        drawVertical,
        drawHorizontal


        x = d3.scaleBand().padding(0.08)
        y = d3.scaleLinear()

        x_axis = d3.axisBottom()
        y_axis = d3.axisLeft()

        let mainColor = config.color

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

            yLabel = labels.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', -75)
                .attr('class', 'label')

            xLabel = labels.append('text')
                .attr('y', 75)
                .attr('class', 'label')
            

            
            updateScales = (ticks) => {
                if (config.orientation === 'vertical'){
                    x = d3.scaleBand()
                        .domain(data.map(d=> d.name))
                        .padding(0.08)
                        .range([0, width])

                    y = d3.scaleLinear()
                        .domain([0, d3.max(data, d=> d.value)* 1.2 ])
                        .range([height, 0])
                } else if (config.orientation === 'horizontal'){
                    let sorted = data.sort((a, b)=> d3.ascending( a.value, b.value))
                    y = d3.scaleBand()
                        .domain(sorted.map(d=> d.name))
                        .padding(0.08)
                        .range([height, 0])

                    x = d3.scaleLinear()
                        .domain([0, d3.max(data, d=> d.value) ])
                        .range([0, width])
                }
                

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
            }        

            drawChart = (resizing = false) =>{
                if (!width || !height) return;

                drawHorizontal();
            }   

            drawHorizontal = () => {
                let lines = chartArea.selectAll('.lolipop-lines')
                    .data(data, d=> d.name)

                lines.exit().remove()

                lines.enter()
                    .append('line')
                    .attr('class', 'lolipop-lines')
                    .attr('x1', 0)
                    .attr('x2', d=> x(d.value))
                    .attr('y1', d=> y(d.name) + y.bandwidth()/2)
                    .attr('y2', d=> y(d.name) + y.bandwidth()/2)
                    .attr('stroke-width', '1px')
                    .attr('stroke', "#000")

                let dots = chartArea.selectAll('.lolipop-dots')
                    .data(data, d=> d.name)

                dots.exit().remove()

                dots.enter()
                    .append('circle')
                    .attr('class', 'lolipop-dots')
                    .attr('cx', d=> x(d.value))
                    .attr('cy', d=> y(d.name) + y.bandwidth()/2)
                    .attr('r', y.bandwidth() * 0.4)
                    .attr('fill', mainColor)
                    .attr('stroke', '#000')
                    .attr('stroke-width', '2px')
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