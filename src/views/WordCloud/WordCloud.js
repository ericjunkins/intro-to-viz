import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";

import WordCloudChart from "./../../components/d3/WordCloudChart"
import {data, config} from "./WordCloudData";

import { render } from "react-dom";

import {TextBox} from "./../../components/TextBox";
import {SiteText} from "./../../components/SiteText";
import cloud from "./wordcloud.png"

export const WordCloud = () => {
    const basicWordcloudRef = useRef();


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="wordcloud">
                <CardContainer title="WordClouds">
                    <Box>
                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="WordClouds are.... mostly trash to be honest. They are pretty trendy on social media, and I guess if that's going to be your audience sure go for it, but they do a horrible job of conveying data and are mostly just to attempt to be flashing with data."
                            />
                        </TextBox>
                        <Center w="100%">
                            <Box w={["60%"]} h={["200px","200px","500px","600px"]}>
                                <Image src={cloud} alt="wordcloud" boxSize="100%"/>
                            </Box>
                        </Center>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}