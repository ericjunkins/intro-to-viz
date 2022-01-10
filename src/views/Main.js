import React, {useState, useEffectr} from "react";
import {Box, Center, Text, VStack} from "@chakra-ui/react";
import { Bars } from "./Bars/Bars";
import { Donut } from "./Donut/Donut";
import { Radar } from "./Radar/Radar";
import { WordCloud } from "./WordCloud/WordCloud";

export const Main = () => {

    return (
        <Center w="100%" py="20px">
            <VStack>
                <Bars />
                <Donut />
                <Radar />
                <WordCloud />
            </VStack>
        </Center>
    )
}