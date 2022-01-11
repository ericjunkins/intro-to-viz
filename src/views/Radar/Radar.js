import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";

import RadarChart from "../../components/d3/RadarChart";
import {data, config} from "./RadarData";


import {TextBox} from "./../../components/TextBox";

export const Radar = () => {
    const basicRadarRef = useRef();


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="75%" maxW="1500px">
                <CardContainer title="Radar (Spider) Charts">
                    <Box>
                        <TextBox>
                            <Text className="description">
                                The Radar (and sometimes called Spider) chart is a visualization used to compare two or more items on various features or characteristics. It is important in this visualization, unlike the others so far, to use very contrasting colors, as segments will overlap and this helps descern the information. The radar chart also usually is easier to understand with a small bit of interaction built in. 
                            </Text>
                        </TextBox>
                        <Box w="100%" h="800px">
                            <D3Container ref={basicRadarRef} data={data.basic} id="basic-radar" viz={RadarChart} config={config.basic}/>
                        </Box>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}