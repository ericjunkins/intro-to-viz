import * as d3 from "d3";
import * as d3Collection from 'd3-collection';
import * as topojson from "topojson";
import * as d3GeoVoronoi from "d3-geo-voronoi";

export default function ConnectionMapChart(config = {}) {    
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
        basemap,
        flightGroup,
        airportGroup,
        voronoiGroup,
        position = config.position,
        size= config.size,
        hypotenuse

        const tooltip = d3.select("text#tooltip");

        let color = d3.scaleLinear()
            .domain([-0.2, 0.2])
            .range(config.colors)

        var projection = config.projection

        let scales = {
            airports: d3.scaleSqrt().range([4,18]),
            segments: d3.scaleLinear().range([1,10])
        }

        var path = d3.geoPath()
            .projection(projection)

    function chart(selection){
        selection.each(function() { 
            
            // Refer to the attached DOM element.
            var dom = d3.select(this);
            svg = dom.select('svg')
                .attr('id', id)
                .append('g')

            chartArea = svg.append('g').attr('id', 'chart-' + id)

            basemap = svg.append('g').attr('id', 'basemap')
            flightGroup = svg.append('g').attr('id', 'flights')
            airportGroup = svg.append('g').attr('id', 'airports')
            voronoiGroup = svg.append('g').attr('id', 'voronoi-group')
                .attr('pointer-events', 'all')


            updateScales = (ticks) => {
                hypotenuse = Math.sqrt(width * width + height * height)

                scales.segments.domain([0, hypotenuse])
            }        

            drawChart = (resizing = false) =>{
                if (!firstRender || !Object.keys(data).length) return; 
                

                drawMap(data.geojson)
                drawAirports(data.airports)
                drawFlights(data.airports, data.flights)
                drawPolygons(data.airports)
                firstRender = false
            }

            function drawMap(map){
                map.objects.states.geometries = map.objects.states.geometries.filter(isContinental)
                let land = topojson.merge(map, map.objects.states.geometries);
                let path = d3.geoPath()

                basemap.append('path')
                    .datum(land)
                    .attr('class', 'land')
                    .attr('d', path)
                    .attr('fill', '#ddd')
            }

            function drawAirports(airports){
                const extent = d3.extent(airports, d=> d.outgoing)
                scales.airports.domain(extent)

                airportGroup.selectAll('circle.airport')
                    .data(airports, d=> d.iata)
                    .enter()
                        .append("circle")
                        .attr("r",  d => scales.airports(d.outgoing))
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("class", "airport")
                        .attr('fill', '#fff')
                        .attr('opacity', 0.6)
                        .attr('stroke', '#252525')
            }

            function drawFlights(airports, flights){
                let bundle = generateSegments(airports, flights);

                let line = d3.line()
                .curve(d3.curveBundle)
                .x(airport => airport.x)
                .y(airport => airport.y);
            
                let links = flightGroup.selectAll("path.flight")
                    .data(bundle.paths)
                    .enter()
                    .append("path")
                    .attr("d", line)
                    .attr("class", "flight")
                    .attr('fill', 'none')
                    .attr('stroke', '#252525')
                    .attr('stroke-width', 1)
                    .attr('stroke-opacity', 0.1)
                    .each(function(d) {
                        // adds the path object to our source airport
                        // makes it fast to select outgoing paths
                        d[0].flights.push(this);
                    });

                // let layout = d3.forceSimulation()
                //     // settle at a layout faster
                //     .alphaDecay(0.1)
                //     // nearby nodes attract each other
                //     .force("charge", d3.forceManyBody()
                //       .strength(10)
                //       .distanceMax(scales.airports.range()[1] * 2)
                //     )
                //     // edges want to be as short as possible
                //     // prevents too much stretching
                //     .force("link", d3.forceLink()
                //       .strength(0.7)
                //       .distance(0)
                //     )
                //     .on("tick", function(d) {
                //       links.attr("d", line);
                //     })
                //     .on("end", function(d) {
                //       console.log("layout complete");
                //     });
                
                //   layout.nodes(bundle.nodes).force("link").links(bundle.links);

            }

            function generateSegments(nodes, links) {
                let bundle = {nodes: [], links: [], paths: []};
              
                bundle.nodes = nodes.map(function(d, i) {
                  d.fx = d.x;
                  d.fy = d.y;
                  return d;
                });
              
                links.forEach(function(d, i) {
                  let length = distance(d.source, d.target);
                  let total = Math.round(scales.segments(length));
              
                  let xscale = d3.scaleLinear()
                    .domain([0, total + 1])
                    .range([d.source.x, d.target.x]);
              
                  let yscale = d3.scaleLinear()
                    .domain([0, total + 1])
                    .range([d.source.y, d.target.y]);
              
                  let source = d.source;
                  let target = null;
                  let local = [source];
              
                  for (let j = 1; j <= total; j++) {
                    target = {x: xscale(j), y: yscale(j)};
                    local.push(target);
                    bundle.nodes.push(target);
                    bundle.links.push({source: source, target: target});
                    source = target;
                  }
              
                  local.push(d.target);
                  bundle.links.push({source: target, target: d.target});
                  bundle.paths.push(local);
                });
              
                return bundle;
            }

            function drawPolygons(airports){
                // convert array of airports into geojson format
                const geojson = airports.map(function(airport) {
                    return {
                    type: "Feature",
                    properties: airport,
                    geometry: {
                        type: "Point",
                        coordinates: [airport.longitude, airport.latitude]
                    }
                    };
                });

                
                // calculate voronoi polygons
                console.log(geojson)
                const polygons = d3GeoVoronoi.geoVoronoi().polygons(geojson);

                voronoiGroup.selectAll("path")
                    .data(polygons.features)
                    .enter()
                    .append("path")
                    .attr("d", d3.geoPath(projection))
                    .attr("class", "voronoi")
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("dblclick", doubleClick);
            }

            function mouseover(d){
                
                console.log(d)
                console.log(this)
                let airport = d.properties.site.properties;

                d3.select(airport.bubble)
                    .classed("highlight", true);

                d3.selectAll(airport.flights)
                    .classed("highlight", true)
                    .raise();

                // make tooltip take up space but keep it invisible
                tooltip.style("display", null);
                tooltip.style("visibility", "hidden");

                // set default tooltip positioning
                tooltip.attr("text-anchor", "middle");
                tooltip.attr("dy", -scales.airports(airport.outgoing) - 4);
                tooltip.attr("x", airport.x);
                tooltip.attr("y", airport.y);

                // set the tooltip text
                tooltip.text(airport.name + " in " + airport.city + ", " + airport.state);

                // double check if the anchor needs to be changed
                let bbox = tooltip.node().getBBox();

                if (bbox.x <= 0) {
                    tooltip.attr("text-anchor", "start");
                }
                else if (bbox.x + bbox.width >= width) {
                    tooltip.attr("text-anchor", "end");
                }

                tooltip.style("visibility", "visible");
            }

            function mouseout(d){
                let airport = d.properties.site.properties;

                d3.select(airport.bubble)
                    .classed("highlight", false);

                d3.selectAll(airport.flights)
                    .classed("highlight", false);

                d3.select("text#tooltip").style("visibility", "hidden");
            }

            function doubleClick(d){
                // toggle voronoi outline
                let toggle = d3.select(this).classed("highlight");
                d3.select(this).classed("highlight", !toggle);
            }

            function isContinental(state) {
                const id = parseInt(state.id);
                return id < 60 && id !== 2 && id !== 15;
            }

            function distance(source, target) {
                const dx2 = Math.pow(target.x - source.x, 2);
                const dy2 = Math.pow(target.y - source.y, 2);
              
                return Math.sqrt(dx2 + dy2);
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