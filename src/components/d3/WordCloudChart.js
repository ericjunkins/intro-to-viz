import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export default function WordCloudChart(config = {}) {    
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
        chartArea,
        firstRender = true,
        draw


        let mainColor = config.color

    function chart(selection){
        selection.each(function() { 
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)
            
            updateScales = (ticks) => {
                chartArea.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
            }        

            drawChart = (resizing = false) =>{
                if (!width || !height) return;
                console.log(data)

                // var layout = d3.CloudLayout().size([width, height])
                //     .words(data)
                //     .rotate(0)
                //     .fontSize(function(d){ return d.size * 0.4})
                //     .on('end', draw)
                //     .start();
            }   

            draw = (words) => {
                console.log('draw')
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