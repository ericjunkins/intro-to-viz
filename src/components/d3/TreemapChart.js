import React from "react";
import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

export function TreemapChart(config = {}) {    
    var margin = config.margin || { top: 20, bottom: 20, left: 20, right: 20 },
        // width = config.width ? config.width - margin.left - margin.right : 900 - margin.left - margin.right,
        // height = config.height ? config.height - margin.top - margin.bottom : 900 -margin.top - margin.bottom,
        height = config.height,
        width = config.width,
        id = config.id || 'punnets',
        data = config.data ? config.data : [],
        svg,
        updateScales,
        treeChart,
        legend,
        colors,
        drawChart,
        labels,
        x,
        y,
        xAxisCall,
        yAxisCall,
        root,
        firstRender=true,
        colors,
        size=config.size

    // colors = d3.scaleOrdinal()
    //     .domain(["1", "2", "3"])
    //     .range(['steelblue', 'tomato', 'green'])

    let c1 = "#31572c"
    let c2 = "#660b05"
    colors = d3.scaleOrdinal()
        .domain([
            'oee', 'harvest', 'standby', 'dead', 'successful pick', 'unsuccessful pick', 'driving', 'tray change',
            'arm standby', 'arm prep', 'arm pick', 'arm image', 'arm qc', 'arm simple move',
            "scrape by", "depth failure", "other"
        ])
        .range([
            '#fefae0', '#e3b265', '#b4cccf', '#737373', '#4f772d', '#92140c', '#8c6522', '#ad5c1d',
            c1, c1,c1,c1,c1,c1,
            c2, c2, c2
        ])

    function chart(selection){
        selection.each(function() { 
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

        treeChart = svg.append('g').attr('id', 'treemap-chart')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        labels =  treeChart.append('g')            

        updateScales = (ticks) => {
            root = d3.stratify()
                .id(d=> d.name)
                .parentId(d=> d.parent)
                (data);

            root.sum(function(d){ return d.value})
            d3.treemap()
                .size([width, height])
                .tile(d3.treemapBinary)
                .padding(10)
                .paddingTop(35)    
                // .paddingInner(5)
                // .padding(20) // 20px padding all around
                (root);

            root.leaves().forEach(function(d,i){
                d.id = i

            x = d3.scaleLinear()
                .domain(d3.extent(data, d=> d.x))

            y = d3.scaleLinear()
                .domain([0, d3.max(data, d=> d.y) * 1.3])
            })
            // console.log(root.descendants())

        }   
        
        function drawLegend(){
        }
        
        drawChart = (resizing = false) =>{
            let parents = root.descendants().filter(d=> {
                return d.children
            })

            let parentRects = treeChart.selectAll('.parent-rects')
                .data(parents, d=> d.id)

            parentRects.enter()
                .append('rect')
                .attr('class', 'parent-rects')
                .attr('x', d=> d.x0)
                .attr('y', d=> d.y0)
                .attr('width', d=> d.x1 - d.x0)
                .attr('height', d=> d.y1 - d.y0)
                .attr('stroke', '#000')
                .attr('fill', d=> colors(d.data.name))


            let parentTexts = treeChart.selectAll(".parent-texts")
                .data(parents, d=> d.id)

            // console.log(parents)

            parentTexts.enter()
                .append('text')
                .attr('class', 'parent-texts')
                .attr('x', d=> d.x0 + 10)
                .attr('y', d=> d.y0 + 16)
                .attr('font-size', '14px')
                .attr('fill', '#000')
                .attr('font-weight', '700')
                // .text(d=> d.data.name + " " + d3.sum(d.children, e=> e.value).toFixed(1) + "%")
                .text(d=> d.data.name + " " + d.data.percent.toFixed(1) + "%")

            let rects = treeChart.selectAll('.tree-rects')
                .data(root.leaves(), d=> d.id)



            rects.enter()
                .append('rect')
                .attr('class', 'tree-rects')
                .attr('x', d=> d.x0)
                .attr('y', d=> d.y0)
                .attr('width', d=> d.x1 - d.x0)
                .attr('height', d=> d.y1 - d.y0)
                .attr('stroke', '#000')
                .attr('fill', d=> colors(d.data.name))


            let leafTexts = treeChart.selectAll('.leaf-texts')
                .data(root.leaves(), d=> d.id)

            leafTexts.enter()
                .append('text')
                .attr('class', 'leaf-texts')
                .attr('data-width', (d) => d.x1 - d.x0)
                // .attr('x', d=> d.x0 + ((d.x1 - d.x0)/2))
                // .attr('y', d=> d.y0 + ((d.y1 - d.y0)/2))
                // .attr('dominant-baseline', 'middle')
                // .attr('text-anchor', 'middle')
                .attr('fill', '#fff')
                .attr('font-size', '12px')
                .attr('x', d=> d.x1 - 8)
                .attr('y', d=> d.y0 + 20)
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '12px')
                .attr('text-anchor', 'end')
                .attr('fill', '#fff')
                .text(d=> {
                    let t = d.data.name + " " +  d.data.value.toFixed(1) + "%"
                    let w = getTextWidth(t, 12, '')
                    return w + 20 >= d.x1 - d.x0 ? '' : t
                })
                
            // let leafPercentages = treeChart.selectAll('.leaf-percentages')
            //     .data(root.leaves(), d=> d.id)

            // leafPercentages.enter()
            //     .append('text')
            //     .attr('class', 'leaf-percentages')
            //     .attr('x', d=> d.x1 - 8)
            //     .attr('y', d=> d.y0 + 20)
            //     .attr('dominant-baseline', 'middle')
            //     .attr('font-size', '12px')
            //     .attr('text-anchor', 'end')
            //     .attr('fill', '#fff')
            //     .text(d=> {return d.data.value.toFixed(0) + "%"})
            }
        });
    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (width && height) drawChart(false);
        return chart;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        // x.range([0, width])
        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        // y.range([height, 0])
        return chart;
    }

    chart.size = function(w, h){
        if (!arguments.length) return {width: width, height: height}
        chart.width(w - margin.left - margin.right);
        chart.height(h - margin.top - margin.bottom);
        if (firstRender) {  
            updateScales(); 
            drawChart(true);
        }
        return chart;
    }

    return chart;
}


function getTextWidth(text, fontSize, fontFace){
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    context.font = fontSize + 'px ' + fontFace;
    return context.measureText(text).width;
}
