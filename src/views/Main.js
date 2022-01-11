import React, {useState, useEffect} from "react";
import {Box, Center, Text, VStack, HStack} from "@chakra-ui/react";
import { Bars } from "./Bars/Bars";
import { Donut } from "./Donut/Donut";
import { Radar } from "./Radar/Radar";
import { WordCloud } from "./WordCloud/WordCloud";
import { Scatter } from "./Scatter/Scatter";
import { BasicScatter } from "./Scatter/BasicScatter";
import { Chord } from "./Chord/Chord";
import { Treemap } from "./Treemap/Treemap";
import { Hexbin } from "./HexbinMap/HexbinMap";
import Navbar from "../components/Navbar";

export const Main = () => {
    const size = useWindowSize();

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
          width: undefined,
          height: undefined
        });
    
        useEffect(()=>{
          function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight
            })
          }
          window.addEventListener("resize", handleResize);

          handleResize();
    
          return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowSize
    }

    return (
        <Box w="100%">
            <Navbar size={size}/>
            <Center w="100%" py="150px" bg="#fafafa">
                <VStack w="50%">
                    <Box w="75%">
                        <Text className="description" textAlign="start">
                            There are many different data visualizations, and picking the right one is important. There are bound to be multiple different methods of conveying your information, and you need to be able to pick one that displays the message you're intending, clearly and concisely. This site will explore some of the most commonly used data visualizations, their uses, and some of their pit-falls as well as what you should avoid doing. It also will go into some basic color usage, and how to select a meaningful color palette that will look nice together.  
                        </Text>
                    </Box>

                    <Bars />
                    <Donut />
                    <BasicScatter />
                    <Treemap />
                    <Radar />
                    <Hexbin />
                    <WordCloud />
                    <Chord />
                    <Scatter /> 
                </VStack>
            </Center>
        </Box>
    )
}