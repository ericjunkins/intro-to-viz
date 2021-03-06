import React, {useState, useEffect} from "react";
import {Box, Center, Text, VStack, HStack, Image, Spinner} from "@chakra-ui/react";
import { Bars } from "./Bars/Bars";
import { Donut } from "./Donut/Donut";
import { Radar } from "./Radar/Radar";
import { WordCloud } from "./WordCloud/WordCloud";
import { Scatter } from "./Scatter/Scatter";
import { BasicScatter } from "./Scatter/BasicScatter";
import { Chord } from "./Chord/Chord";
import { Treemap } from "./Treemap/Treemap";
import { Hexbin } from "./HexbinMap/HexbinMap";
import { BoxPlot } from "./Boxplot/Boxplot";
import Navbar from "../components/Navbar";

import cholera from "./../assets/cholera_outbreak.jpg";
import napolean_march from "./../assets/Minard.png";
import cattle_consumption from "./../assets/cattle_consumption.png"
import favorite from "./../assets/my_favorite_viz.png"
import { ColorSelection } from "./ColorSelection/ColorSelection";

import {SiteText} from "./../components/SiteText";
import { Maps } from "./Maps/Maps";

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
      <Box w="100%" pb={["50px","50px","400px","400px"]}>
        <Navbar size={size}/>
        <Center 
          w="100%" 
          // bg="#2e83a3" 
          h={["125px","125px","350px","350px"]}
          backgroundImage={"linear-gradient(270deg, #034d69, #2e83a3, #034d69)"}
          borderBottom="3px solid #034d69"
          borderTop="2px solid #034d69"
          >
            <Text color="#fff" fontSize={["32px","42px"]} fontWeight={500}>
              Introduction to Data Visualizations
            </Text>
        </Center>
        <Center w="100%" py={["50px","50px","150px","150px"]} bg="#fafafa">
          {size.width ? 
          <VStack 
            w={["100%", "100%", "100%", "1000px"]} 
            textAlign="start" 
            px={["20px","20px","20px",0]}
            id="intro"
          >
            <Box w="100%">
              <SiteText 
                type="title"
                text="What is Data Visualization"
              />
              <SiteText 
                type="standard"
                text="Data visualization is the graphical representation of data. It presents data as images or graphics for a user to be able to understand, interpret, and identify patterns about data."
              />
              <SiteText 
                type="title"
                text="Why is this Important"
              />
              <SiteText 
                type="standard"
                text=" Visualizing data can be a more effective way of conveying meaning from your data, and sharing with a larger audience. It can help highlight and point out trends in data that otherwise would be very hard to come by. It allows the creator to make a story about the data, and engage users with it. Data only can have value when processed, analyzed, and remembered."
              />
              <SiteText 
                type="title"
                text="Famous historical Visualizations"
              />
              <SiteText 
                type="standard"
                text="Before starting I'd like to show just a few famous visulizations of data from history, and give some examples on how data can be visualized in many different forms. These were all done before the invention of computers, and were highly effective at conveying information and getting a better understanding of the data. "
              />

              <SiteText 
                type="standard"
                text="This first example is from London in 1854, by John Snow. There was a massive Cholera outbreak in the city, and very hard to determine where it was coming from. This visualization depicts where all the houses were that had reportings of Cholera, and using this visualization it was determined that they all shared a common water well, which ended up being the source."
                py="30px"
              />
              
              <Box py="20px" pb="40px">
                <Image src={cholera} />
              </Box>

              <SiteText 
                type="standard"
                text="This next example is by Charles Minard in 1869, and depicts Napoleons 1812 Russian campaign march, and the size of his army throughout it. The beige color depicts the outbound journey, and black the return."
              />


              <Box py="40px">
                <Image src={napolean_march} />
              </Box>

              <SiteText 
                type="standard"
                text="This is also another visualization by Charles Minard, in 1858, showing cattle sent around France for consumption in Paris"
              />

              <Box py="40px">
                <Image src={cattle_consumption} />
              </Box>
              
              <Text fontSize="24px" fontWeight={700}>
                Motivation
              </Text>


              <SiteText 
                type="standard"
                text="There are many different data visualizations, and picking the right one is important. There are bound to be multiple different methods of conveying your information, and you need to be able to pick one that displays the message you're intending, clearly and concisely. This site will explore some of the most commonly used data visualizations, their uses, and some of their pit-falls as well as what you should avoid doing. It also will go into some basic color usage, and how to select a meaningful color palette that will look nice together."
              />
              <SiteText 
                type="standard"
                text="Also here I want to start off with my favorite visualization ever."
                py="30px"
              />

              <Box py="40px">
                <Image src={favorite} />
              </Box>

            </Box>
            <Bars size={size}/>
            <Donut size={size}/>
            <WordCloud size={size}/>
            <BasicScatter size={size}/>
            <Treemap size={size}/>
            <BoxPlot size={size} />
            <Radar size={size}/>
            <Maps size={size}/>
            <Hexbin size={size}/>
            {/* <ConnectionMap size={size} /> */}
            <Chord size={size}/>
            <Scatter size={size}/>
          </VStack>
          :
          <Spinner />
          }

        </Center>
        <ColorSelection />
      </Box>
    )
}