import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function BubblesChart(config = {}) {    
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
        timeLabel,
        year = config.startingYear,
        displayData,
        displayCountries = ['asia', 'africa', 'europe', 'americas'],
        drawLegend,
        tooltip,
        showTooltip,
        moveTooltip,
        hideTooltip,
        mode='log'


        x = d3.scaleLog()
            .base(10)
            .domain([142, 150000])
        y = d3.scaleLinear()
            .domain([0, 90])

        let z = d3.scaleSqrt()
            .domain([200000, 1310000000])
            .range([2, 40]);

        const area = d3.scaleLinear()
            .range([25 * Math.PI, 3000 * Math.PI])
            .domain([2000,1400000000])

        // const continentColor = d3.scaleOrdinal(d3.schemeCategory10)

        const continentColor = d3.scaleOrdinal()
            .domain(['asia', 'africa', 'europe', 'americas'])
            .range(["#1776b6", "#ff7f00", "#24a121", "#d8241f"])

        x_axis = d3.axisBottom()
            // .tickValues([400,4000,40000])
            .tickFormat(d3.format("$"))

        y_axis = d3.axisLeft()

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
                .text("GDP Per Capita ($)")
            yLabel = labels.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "20px")
                .attr("text-anchor", "middle")
                .text("Life Expectancy (Years)")
            timeLabel = labels.append("text")
                .attr("font-size", "40px")
                .attr("opacity", "0.4")
                .attr("text-anchor", "middle")
                .text("1800")

            tooltip = d3.select("#interactive-bubbles")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("border-radius", "5px")
                .style("padding", "10px")
            

            showTooltip = function(event,d) {
                tooltip
                    .transition()
                    .duration(200)
                tooltip
                    .style("opacity", 1)
                    .html(
                        "Country: " + d.country + "<br>" + 
                        "Population: " + ((d.population/1000000).toFixed(2) + " M") + "<br>" + 
                        "GDP Per Cap: " + d.income + "<br>" + 
                        "Life Exp: " + d.life_exp
                        )
                    .style("left", (event.x)/2 + "px")
                    .style("top", (event.y)/2-150 - height + "px")
            }
            moveTooltip = function(event, d) {
                tooltip
                    .style("left", (event.x)/2 + "px")
                    .style("top", (event.y)/2-150 - height + "px")
            }
            hideTooltip = function(event, d) {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0)
            }
            drawLegend = () => {
                if (!firstRender) return; 
                const size = 20
                const allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]

                const valuesToShow = config.valuesToShow
                // const xCircle = 390
                const xCircle = 0
                // const xLabel = 440
                const xLabel = 50
                
                let legend = chartArea.append('g')
                    .attr('transform', 'translate(' + (width - 30) + "," + (0) + ")")

                legend
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("circle")
                        .attr("cx", xCircle)
                        .attr("cy", d => height - 100 - z(d))
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
                        .attr('y1', d => height - 100 - z(d))
                        .attr('y2', d => height - 100 - z(d))
                        .attr('stroke', 'black')
                        .style('stroke-dasharray', ('2,2'))

                // Add legend: labels
                legend
                .selectAll("legend")
                    .data(valuesToShow)
                    .join("text")
                        .attr('x', xLabel)
                        .attr('y', d => height - 100 - z(d))
                        .text( d => d/1000000)
                        .style("font-size", 10)
                        .attr('alignment-baseline', 'middle')

                // Legend title
                legend
                    .append("text")
                    .attr('x', xCircle)
                    .attr("y", height - 100 +30)
                    .text("Population (M)")
                    .attr("text-anchor", "middle")
            }
            updateScales = (resizing = false) => {
                if (mode === 'log'){
                    x = d3.scaleLog()
                        .base(10)
                        .domain([142, 150000])
                        .range([0, width])

                        x_axis = d3.axisBottom()
                            .tickValues([400,4000,40000])
                            .tickFormat(d3.format("$"))
                } else {
                    x = d3.scaleLinear()
                        .domain([142, 150000])
                        .range([0, width])

                        x_axis = d3.axisBottom()
                            .tickFormat(d3.format("$"))
                }

                y.range([height, 0])

                xLabel
                    .attr("y", 70)
                    .attr("x", 0)
                yLabel
                    .attr("y", -70)
                    .attr("x", -170)
                timeLabel
                    .attr("y", height - 10)
                    .attr("x", width - 40)

                x_axis.scale(x)
                y_axis.scale(y)
                xAxisCall
                    .attr('transform', 'translate(0,' + height + ')')
                    .transition().duration(resizing ? 1000 : 50)
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

            drawChart = (resizing = false) =>{
                if (!width || !height) return;

                displayData = data.filter(function(d){
                    return d.year === year
                })[0].countries

                let bubbles = chartArea.selectAll('.bubbles')
                    .data(displayData, d=> d.country)

                bubbles.exit().remove()

                bubbles
                    .transition().duration(resizing ? 1000 : 50)
                    .attr('cx', d=> x(d.income))
                    .attr('cy', d=> y(d.life_exp))
                    .attr("r", d => Math.sqrt(area(d.population) / Math.PI))
                    .attr('visibility', d=> displayCountries.includes(d.continent) ? 'visible' : 'hidden')

                bubbles.enter()
                    .append('circle')
                    .attr('class', 'bubbles')
                    .attr('id', d=> 'bubble-' + d.country)
                    .attr('cx', d=> x(d.income))
                    .attr('cy', d=> y(d.life_exp))
                    .attr("r", d => Math.sqrt(area(d.population) / Math.PI))
                    .attr('fill', d=> continentColor(d.continent))
                    .attr('fill-opacity', 0.7)
                    .attr('stroke', '#000')
                    .attr('visibility', d=> displayCountries.includes(d.continent) ? 'visible' : 'hidden')
                    .on("mouseover", showTooltip )
                    .on("mousemove", moveTooltip )
                    .on("mouseleave", hideTooltip )

                firstRender = false;

                timeLabel.text(year)
            }
        });
    }

    chart.mode = function(value){
        if (!arguments.length) return mode;
        mode = value ? "log" : "linear";
        updateScales(true);
        drawChart(true);
    }

    chart.continents = function(value) {
        if (!arguments.length) return displayCountries;
        displayCountries = value
        drawChart(false)
        return chart;
    }

    chart.year = function(value) {
        if (!arguments.length) return year;
        year = value.toString();
        drawChart(false)
        return chart;
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