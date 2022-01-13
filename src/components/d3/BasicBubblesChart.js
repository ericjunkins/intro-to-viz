import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function BasicBubblesChart(config = {}) {    
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
        drawLegend,
        z,
        size=config.size


        x = d3.scaleLinear()
        y = d3.scaleLinear()

        let bubblesMax = size === 'sm' ? 20 : 40
        if (config.scaling === 'area'){
            z = d3.scaleSqrt()
                .domain([200000, 1310000000])
                .range([2, bubblesMax]);
        } else if (config.scaling === 'radius'){
            z = d3.scaleLinear()
                .domain([200000, 1310000000])
                .range([2, bubblesMax]);
        }
        
        x_axis = d3.axisBottom().ticks(3)
        y_axis = d3.axisLeft()

        const color = d3.scaleOrdinal()
            .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
            .range(d3.schemeSet1);

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


            xLabel = labels.append("text")
                .attr('class', 'axis-text-' + size)
                .attr("text-anchor", "middle")
                .attr("y", 70)
                .attr("x", 0)

            yLabel = labels.append("text")
                .attr("transform", "rotate(-90)")
                .attr('class', 'axis-text-' + size)
                .attr("text-anchor", "middle")                
                .attr("y", -70)



            updateScales = (ticks) => {
                xLabel.text(config.labels.x)
                yLabel.text(config.labels.y)
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

                let title = labels.append('text')
                    .attr('x', width/2)
                    .attr('class', 'title-text-' + size) 
                    .attr('y', -margin.top/2)
                    .attr('text-anchor', 'middle')
                    .text(config.title)
                
                    drawLegend();
            }        

            drawLegend = () => {
                if (!firstRender) return; 
                const dotSize = size === "sm" ? 5 : 8
                const allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]

                const valuesToShow = config.valuesToShow
                const xCircle = 0
                
                const xLabel = size === 'sm' ? 25 : 50
                const wOffset = size === 'sm' ? 30 : 50
                const hOffset = size === 'sm' ? 30 : 50

                const cirleOffset = size === 'sm' ? 50 : 100

                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + (width - wOffset) + "," + (hOffset) + ")")

                legend
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("circle")
                        .attr("cx", xCircle)
                        .attr("cy", d => height - cirleOffset - z(d))
                        .attr("r", d => z(d))
                        .style("fill", "none")
                        .attr("stroke", "black")

                // Add legend: segments
                legend
                .selectAll("legend")
                    .data(valuesToShow)
                    .join("line")
                        .attr('x1', d => xCircle + z(d))
                        .attr('x2', xLabel)
                        .attr('y1', d => height - cirleOffset - z(d))
                        .attr('y2', d => height - cirleOffset - z(d))
                        .attr('stroke', 'black')
                        .style('stroke-dasharray', ('2,2'))

                // Add legend: labels
                legend
                .selectAll("legend")
                    .data(valuesToShow)
                    .join("text")
                        .attr('x', xLabel)
                        .attr('y', d => height - cirleOffset - z(d))
                        .text( d => d/1000000)
                        .style("font-size", size === 'sm' ? 8 : 10)
                        .attr('alignment-baseline', 'middle')

                // Legend title
                legend
                    .append("text")
                    .attr('x', xCircle)
                    .attr("y", height - cirleOffset + (size === 'sm' ? 15 : 20))
                    .text("Population (M)")
                    .attr("text-anchor", "middle")
                    .attr('class', 'label-text-' + size)

                let legendGroup = legend.append('g')
                    .attr('transform', 'translate(' + (0) + "," + (size === 'sm' ? height * 0.35 : 150) + ")")
                
                legendGroup.selectAll("myrect")
                    .data(allgroups)
                    .join("circle")
                    .attr("cx", (size === 'sm' ? -30 : -30))
                    .attr("cy", (d,i) => i*(2.5 * dotSize)) // 100 is where the first dot appears. 25 is the distance between dots
                    .attr("r", dotSize)
                    .style("fill", d =>  color(d))
                    .attr('stroke', '#000')

                legendGroup.selectAll("mylabels")
                    .data(allgroups)
                    .enter()
                    .append("text")
                    .attr("x", (size === 'sm' ? -20 : -20))
                    .attr("y", (d,i) =>  i * (2.5 * dotSize) + (dotSize/2)) // 100 is where the first dot appears. 25 is the distance between dots
                    .style("fill", d => color(d))
                    .text(d => d)
                    .attr("text-anchor", "left")
                    .attr('class', 'label-text-' + size)
                    .style("alignment-baseline", "middle")
            }

            drawChart = (resizing = false) =>{
                if (!width || !height) return;

                let bubbles = chartArea.selectAll('.bubbles')
                    .data(data, d=> d.country)

                bubbles.exit().remove()
                
                bubbles.enter()
                    .append('circle')
                    .attr('class', 'bubbles')
                    .attr("cx", d => x(d.gdpPercap))
                    .attr("cy", d => y(d.lifeExp))
                    .attr("r", d => z(d.pop))
                    .style("fill", d => color(d.continent))
                    .attr('fill-opacity', 0.75)
                    .attr('stroke', '#000')
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