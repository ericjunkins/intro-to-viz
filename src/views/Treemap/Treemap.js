import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import TreemapImage from "./treemap.png";

import {TextBox} from "./../../components/TextBox";
import {SiteText} from "./../../components/SiteText";

export const Treemap = () => {
    const basicChord = useRef();

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="treemap">
                <CardContainer title="Treemap">
                    <Box>
                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="The Treemap visualization is used to display hierarchical data and nested sets. The area of each rectangle is proporational to the percent of parent section. Usually try and stick to no more than 3-4 hierarchical layers, any more than that usually tends to be confusing. Also generally interactions make these easier and more useful to the user"
                            />
                        </TextBox>
                        <Box w="100%" h={["400px", "800px"]} py="20px">
                            <Image src={TreemapImage} boxSize="100%"/>
                        </Box>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}