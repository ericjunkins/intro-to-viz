import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import {data, config} from "./HexbinMapConfig";

import HexbinMap from "./../../components/d3/HexbinMap";

import {TextBox} from "./../../components/TextBox";
import * as d3 from "d3";

export const Hexbin = () => {
    const hexbinRef = useRef();
    const [map, setMap] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json").then(function(d){
            d.features.forEach(function(state){
                let match = data.basic.filter(v=> v.state === state.properties.iso3166_2)[0]
                // console.log(match)
                match.difference = Math.round((match.rep - match.dem) * 100)/10000.0 
                state.properties.affiliation = match.difference
            })
            setMap(d.features)
            setLoaded(true)
        })
    }, [])

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="75%" maxW="1500px">
                <CardContainer title="Hexbin Map">
                    <Box>
                        <TextBox>
                            <Text className="description" pb="20px">
                                One challenge when displaying map data normally is that area of locations can greatly skew your perception of the data. For instance normally states like Rhode Island are so small they get almost no visual attention in a map, where states like California and Texas can dominate. A Hexbin map is a great alternative when you don't care about the geographic nature of the map and care more about displaying data
                            </Text>
                        </TextBox>
                        {loaded ? 
                            <Box w="100%" h="800px" >
                                <D3Container ref={hexbinRef} data={map} id="basic-hexbin" viz={HexbinMap} config={config.basic} />
                            </Box>
                            :
                            <Center w="100%" h="800px" >
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