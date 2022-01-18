import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";
import ConnectionMapChart from "./../../components/d3/ConnectionMap";

import {data, config} from "./MapConfig";

import {TextBox} from "./../../components/TextBox";
import {SiteText} from "./../../components/SiteText";

import { getSize } from "./../../helpers/FontSizes";
import * as d3 from "d3";


const projection = d3.geoAlbers().scale(1280).translate([480, 300]);

export const ConnectionMap = ({size}) => {
    const connectionMap = useRef();
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)


    config.basic.size = getSize(size.width)
    config.basic.margin = config.margins[getSize(size.width)]
    config.basic.position = config.position[getSize(size.width)]
    config.basic.projection = projection

    useEffect(()=> {
        const urls = {
            // source: https://observablehq.com/@mbostock/u-s-airports-voronoi
            // source: https://github.com/topojson/us-atlas
            map: "https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json",
          
            // source: https://gist.github.com/mbostock/7608400
            airports:
              "https://gist.githubusercontent.com/mbostock/7608400/raw/e5974d9bba45bc9ab272d98dd7427567aafd55bc/airports.csv",
          
            // source: https://gist.github.com/mbostock/7608400
            flights:
              "https://gist.githubusercontent.com/mbostock/7608400/raw/e5974d9bba45bc9ab272d98dd7427567aafd55bc/flights.csv"
        };

        const promises = [
            d3.csv(urls.airports, typeAirport),
            d3.csv(urls.flights,  typeFlight),
            d3.json(urls.map)
        ]

        Promise.all(promises).then(processData)
    }, [])

    // const typeMap = (loc) => {
    //     console.log(loc)
    // }

    const typeAirport = (airport) => {
        airport.longitude = parseFloat(airport.longitude);
        airport.latitude  = parseFloat(airport.latitude);
      
        // use projection hard-coded to match topojson data
        const coords = projection([airport.longitude, airport.latitude]);
        airport.x = coords[0];
        airport.y = coords[1];
      
        airport.outgoing = 0;  // eventually tracks number of outgoing flights
        airport.incoming = 0;  // eventually tracks number of incoming flights
      
        airport.flights = [];  // eventually tracks outgoing flights
        return airport;
    }

    const typeFlight = (flight) => {
        flight.count = parseInt(flight.count);
        return flight;
    }

    const processData = (values) => {
        // console.log(values)
        let airports = values[0]
        let flights = values[1]
        let geojson = values[2]

        // console.log(airports, flights, geojson)

        let iata = new Map(airports.map(node => [node.iata, node]))
        flights.forEach(function(link){
            link.source = iata.get(link.origin)
            link.target = iata.get(link.destination)

            link.source.outgoing += link.count;
            link.target.incoming += link.count;
        })

        let old = airports.length;
        airports = airports.filter(airport => airport.x >= 0 && airport.y >= 0);
        // console.log(" removed: " + (old - airports.length) + " airports out of bounds");

        // remove airports with NA state
        old = airports.length;
        airports = airports.filter(airport => airport.state !== "NA");
        // console.log(" removed: " + (old - airports.length) + " airports with NA state");

        // remove airports without any flights
        old = airports.length;
        airports = airports.filter(airport => airport.outgoing > 0 && airport.incoming > 0);
        // console.log(" removed: " + (old - airports.length) + " airports without flights");

        airports.sort((a, b) => d3.descending(a.outgoing, b.outgoing));

        // keep only the top airports
        old = airports.length;
        airports = airports.slice(0, 50);
        // console.log(" removed: " + (old - airports.length) + " airports with low outgoing degree");


        // reset map to only include airports post-filter
        iata = new Map(airports.map(node => [node.iata, node]));

        // filter out flights that are not between airports we have leftover
        old = flights.length;
        flights = flights.filter(link => iata.has(link.source.iata) && iata.has(link.target.iata));
        // console.log(" removed: " + (old - flights.length) + " flights");

        setLoaded(true)
        setData({airports: airports, flights: flights, geojson: geojson})

    }


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="connection">
                <CardContainer title="Connection Map">
                    <Box>
                        <TextBox>
                            <SiteText 
                                type="standard"
                                text=""
                                pb="20px"
                            />
                        </TextBox>
                        {loaded ? 
                            <Box w="100%" h={["400px", "800px"]} >
                                <D3Container ref={connectionMap} data={data} id="basic-connection-map" viz={ConnectionMapChart} config={config.basic} />
                            </Box>
                            :
                            <Center w="100%"  h={["400px", "800px"]} >
                                <Spinner   
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' 
                                />
                            </Center>
                        }
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}