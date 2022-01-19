import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import ChordDiagram from "../../components/d3/ChordDiagram";
import {config, data} from "./CordConfig";


import {TextBox} from "./../../components/TextBox";
import {SiteText, Interactivity} from "./../../components/SiteText";

import { getSize } from "./../../helpers/FontSizes";


export const Chord = ({size}) => {
    const basicChord = useRef();
    
    config.basic.size = getSize(size.width)
    config.basic.margin = config.margins[getSize(size.width)]

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="chord">
                <CardContainer title="Chord Diagram">
                    <Box>
                        <TextBox>
                            <SiteText type="standard"
                                text="The Chord Diagram is a fairly niche visualization, it is used to display flow between several entities. Each entity is represented by a fragment of the outer part. They are very compact and can display a lot of information, but they require the reader to have a good understanding of them to accurately convey information. Only use these when you know your audience will be able to interpret the data. Also consider giving small interactions to help distinguish data points"
                            />
                        </TextBox>
                        <Interactivity />
                        <Box w="100%" h={["350px", "800px"]} mt="40px">
                            <D3Container ref={basicChord} data={data.basic} id="basic-scatter" viz={ChordDiagram} config={config.basic} />
                        </Box>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}