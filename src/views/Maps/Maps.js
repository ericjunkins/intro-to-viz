import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";
import ColorMapChart from "./../../components/d3/ColorMap";
import BubblesMapChart from "./../../components/d3/BubblesMap";
import {data, config} from "./MapConfig";

import {TextBox} from "./../../components/TextBox";
import {SiteText, Interactivity} from "./../../components/SiteText";

import connected_map from "./../../assets/connections_chart.PNG"

import { getSize } from "./../../helpers/FontSizes";
import * as d3 from "d3";

export const Maps = ({size}) => {
    const colorMapRef = useRef();
    const [colorMapData, setColorMapData] = useState({})
    const [colorMapLoaded, setColorMapLoaded] = useState(false)

    const bubblesMapRef = useRef();
    const [bubblesMapData, setBubblesMapData] = useState({})
    const [bubblesMapLoaded, setBubblesMapLoaded] = useState(false)

    let s = getSize(size.width)
    config.colorMap.size = s
    config.colorMap.margin = config.margins[s]
    config.colorMap.position = config.position[s]

    
    config.bubblesMap.size = s
    config.bubblesMap.margin = config.margins[s]
    config.bubblesMap.position = config.position[s]
    config.bubblesMap.area = config.area[s]
    

    useEffect(()=> {

        const colorMapPromises = [
            d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
            d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d){
                d.pop = +d.pop
                return d
            })
        ]

        const bubblesMapPromises = [
            d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
            d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv", function(d){
                d.n = +d.n
                d.homelat = +d.homelat
                d.homelon = +d.homelon
                return d
            })
        ]

        Promise.all(colorMapPromises).then(processColorMapData)
        Promise.all(bubblesMapPromises).then(processBubblesMapData)
    }, [])

    const processColorMapData = (values) => {
        setColorMapData({topo: values[0], pop: values[1]})
        setColorMapLoaded(true)
    }

    const processBubblesMapData = (values) => {
        setBubblesMapData({topo: values[0], data: values[1]})
        setBubblesMapLoaded(true)
    }


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="maps">
                <CardContainer title="Maps">
                    <Box>
                        <SiteText 
                            type="subtitle"
                            text="Choropleth Map"
                            py="20px"
                        />

                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="The most standard type of map you usually see is called a Choropleth map, which is where predefined regions of a map are given a color encoding to represent data. These regions are usually regions defined by countries, continents, counties, states, etc. Data for these is typically a continous variable that lends well to single continous color scales. The below Population of the world shows a good example of Choropleth maps"
                            />
                        </TextBox>

                        <Interactivity />
                        {colorMapLoaded ? 
                            <Box w="100%" h={["400px", "800px"]} py="20px">
                                <D3Container ref={colorMapRef} data={colorMapData} id="color-map" viz={ColorMapChart} config={config.colorMap} />
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

                        <Box my="50px"/>

                        <SiteText 
                            type="subtitle"
                            text="Bubbles Map"
                            py="20px"
                        />

                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="Another common map visualization is a bubbles overlay map, where data is overlaied geographically onto the lat/long coords of the location, and then bubbles size encodes the data value. Remember when using this that your variable needs to be encoded to the area of the bubble, not the radius. Here we show a dataset about where surfers live, and where theyre tweeting about, and color corresponds the their home continent, location on the map is where they tweet about."
                            />
                        </TextBox>
                        <Interactivity />
                        {bubblesMapLoaded ? 
                            <Box w="100%" h={["400px", "800px"]} py="20px">
                                <D3Container ref={bubblesMapRef} data={bubblesMapData} id="bubbles-map" viz={BubblesMapChart} config={config.bubblesMap} />
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

                        <SiteText 
                            type="subtitle"
                            text="Connected Node Map"
                            py="20px"
                        />

                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="If you have data that you want to show connections between locations a Connected Node Map Chart can display this well. Here I've put an example of one, showing the flights connecting from a given airport in the US to all joining airports. Because this viz takes quite a lot of computation power I'm leaving the example out of this site, but it can be found at:"
                            />
                            <Text>
                                <Link target="_blank" href={"https://bl.ocks.org/sjengle/raw/2e58e83685f6d854aa40c7bc546aeb24/?raw=true"} color="#16546b" style={{textDecoration: "underline"}} fontSize={["20px", "20px", "18px", "24px"]}>
                                    Connected Node Chart
                                </Link>
                            </Text>
                        </TextBox>

                        <Center w="100%" py={["10px","10px","30px","30px"]}>
                            <Image src={connected_map} border="1px solid #ababab"/>
                        </Center>

                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}