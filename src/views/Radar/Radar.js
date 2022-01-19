import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, Link, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";

import RadarChart from "../../components/d3/RadarChart";
import {data, config} from "./RadarData";


import {TextBox} from "./../../components/TextBox";
import {SiteText, Interactivity} from "./../../components/SiteText";

import { getSize } from "./../../helpers/FontSizes";

import parallel from "./../../assets/Parallel_coordinates-sample.png";

export const Radar = ({size}) => {
    const basicRadarRef = useRef();
    config.basic.size = getSize(size.width)
    config.basic.margin = config.margins[getSize(size.width)]

    
    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="radar">
                <CardContainer title="Radar Chart">
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="The Radar (and sometimes called Spider) chart is a visualization used to compare two or more items on various features or characteristics. It is important in this visualization, unlike the others so far, to use very contrasting colors, as segments will overlap and this helps descern the information. The radar chart also usually is easier to understand with a small bit of interaction built in. "
                        />
                    </TextBox>
                    <Interactivity />
                    <Box w="100%" h={["350px","800px"]}>
                        <D3Container ref={basicRadarRef} data={data.basic} id="basic-radar" viz={RadarChart} config={config.basic}/>
                    </Box>

                    <SiteText 
                        type="subtitle"
                        text="Parallel Coordinates Chart"
                    />
                    <Box my="20px"/>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="In the same flavor of data display of the radar chart is the Parallel Coordinates chart. It is used to display multiple features/characteristics of different entities, however can have a significantly larger number of entities to display. Usually they are grouped by color and used to display trends between characteristics"
                        />

                    </TextBox>

                    <Center w="100%" py={["20px","20px","50px","50px"]}>
                        <Image src={parallel} border="1px solid #ababab"  w={["100%", "75%"]}/>
                    </Center>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="The use of the parallel coordinate viz is mostly for exploratory visualization, to understand relationships between variables in your dataset. Here's a cool example about exoplanets: "
                        />
                        <Link target="_blank" href="https://bl.ocks.org/syntagmatic/raw/482706e0638c67836d94b20f0cb37122/?raw=true" color="#16546b" style={{textDecoration: "underline"}} fontSize={["18px", "18px", "18px", "22px"]}>
                            Exoplanet parallel coordinate visualization
                        </Link>
                    </TextBox>


                </CardContainer>
            </Box>
        </Center>
    )
}