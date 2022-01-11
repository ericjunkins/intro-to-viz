import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import TreemapImage from "./treemap.png";

import {TextBox} from "./../../components/TextBox";

export const Treemap = () => {
    const basicChord = useRef();

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="75%" maxW="1500px">
                <CardContainer title="Treemap">
                    <Box>
                        <TextBox>
                            <Text className="description" pb="20px">
                                The Treemap visualization is used to display hierarchical data and nested sets. The area of each rectangle is proporational to the percent of parent section. Usually try and stick to no more than 3-4 hierarchical layers, any more than that usually tends to be confusing. Also generally interactions make these easier and more useful to the user 
                            </Text>
                        </TextBox>
                        <Box w="100%" h="800px" py="20px">
                            <Image src={TreemapImage} boxSize="100%"/>
                        </Box>
                        {/* <Box w="100%" h="800px" my="40px">
                            <D3Container ref={basicChord} data={data.basic} id="basic-scatter" viz={ChordDiagram} config={config.basic} />
                        </Box> */}
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}