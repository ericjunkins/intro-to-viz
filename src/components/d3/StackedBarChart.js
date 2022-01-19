import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function StackedBarsChart(config = {}) {    
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
        drawLegend,
        size=config.size

        x = d3.scaleBand().padding(0.08)
        y = d3.scaleLinear()

        x_axis = d3.axisBottom()
        y_axis = d3.axisLeft()

        let colors = d3.scaleOrdinal()
            .domain(['pick', 'miss', 'backoff', "drop"])
            .range(config.colors)    

    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }

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
                .attr('class', 'axis-' + size)

            yAxisCall = chartArea.append('g')
            .attr('class', 'axis-' + size)

            yLines = chartArea.append('g')
                .attr('class', 'grid')

            labels = chartArea.append('g')

            yLabel = labels.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', (size === 'sm' ? -50 : -75))
                .attr('class', 'label-text-' + size)
                .attr('text-anchor', 'middle')

            xLabel = labels.append('text')
                .attr('y', (size === 'sm' ? 40 : 75))
                .attr('class', 'label-text-' + size)
                .attr('text-anchor', 'middle')
            
            updateScales = (ticks) => {
                data.forEach(function(d){
                    d.total = d.pick + d.miss + d.backoff + d.drop
                })
                x.domain(data.map(d=> d.group))

                y.domain([0, d3.max(data, d=> d.total)* 1.2 ])
                
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
                    .attr('transform', 'translate(300, -40)')

                let l1 = legend.append('g')
                let l2 = legend.append('g')
                    .attr('transform', 'translate(100, 0)')
                let l3 = legend.append('g')
                    .attr('transform', 'translate(200, 0)')
                let l4 = legend.append('g')
                    .attr('transform', 'translate(300, 0)')

                l1.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', colors('pick'))
                    .attr('stroke', '#000')
                l1.append('text')
                    .attr('x', 30)
                    .attr('y', 10)
                    .attr('dominant-baseline', 'middle')
                    .attr('class', 'legend-text')
                    .text('Hit')

                l2.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', colors('miss'))
                    .attr('stroke', '#000')
                l2.append('text')
                    .attr('x', 30)
                    .attr('y', 10)
                    .attr('dominant-baseline', 'middle')
                    .attr('class', 'legend-text')
                    .text('Miss')

                l3.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', colors('backoff'))
                    .attr('stroke', '#000')
                l3.append('text')
                    .attr('x', 30)
                    .attr('y', 10)
                    .attr('dominant-baseline', 'middle')
                    .attr('class', 'legend-text')
                    .text('Crush')

                l4.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', colors('drop'))
                    .attr('stroke', '#000')
                l4.append('text')
                    .attr('x', 30)
                    .attr('y', 10)
                    .attr('dominant-baseline', 'middle')
                    .attr('class', 'legend-text')
                    .text('Drop')
                
                

            }

            drawChart = (resizing = false) =>{
                if (!width || !height) return;

                let stackedData = d3.stack()
                    .keys(['pick', 'miss', 'backoff', 'drop'])
                    (data)
                stackedData.forEach(function(d,i){
                    d.id = 'stacked-' + i
                })
                let groups = chartArea.selectAll('.stacked-group')
                    .data(stackedData, d=> d.id)

                groups.enter()
                    .append('g')
                    .attr('fill', d=> colors(d.key))
                    .selectAll('rect')
                    .data(d=> d)
                    .join('rect')
                        .attr('x', d=> x(d.data.group))
                        .attr("y", d => y(d[1]))
                        .attr("height", d => y(d[0]) - y(d[1]))
                        .attr("width",x.bandwidth())
                        .attr('stroke', "#333")

                firstRender = false;
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