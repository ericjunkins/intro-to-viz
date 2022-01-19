import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";
import BarsChart from "../../components/d3/BarsChart";
import StackedBarsChart from "../../components/d3/StackedBarChart";
import LolipopChart from "../../components/d3/LolipopChart";
import {config, data} from "./BarsData";

import {TextBox} from "./../../components/TextBox";
import {SiteText} from "./../../components/SiteText";

import { getSize } from "./../../helpers/FontSizes";

import diverging_stacked from "./../../assets/diverging_stacked.PNG";
import music_revenue from "./../../assets/music_revenue.PNG";

export const Bars = ({size}) => {
    const verticalRef = useRef();
    const verticalOverloadRef = useRef();
    const verticalHighlightRef = useRef();
    const horizontalRef = useRef();
    const lolipopRef = useRef();
    const stackedRef = useRef();

    
    const s = getSize(size.width)
    const m = config.margins[getSize(size.width)]

    config.vertical.size = s
    config["vertical-overload"].size = s
    config["vertical-highlight"].size = s
    config.horizontal.size = s
    config.lolipop.size = s
    config.stacked.size = s

    config.vertical.margin = m
    config["vertical-overload"].margin = m
    config["vertical-highlight"].margin = m
    config.horizontal.margin = m
    config.lolipop.margin = m
    config.stacked.margin = m

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="bar">
                <CardContainer title="Bar Graphs" >
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="Let's start with one of the most standard data visualizations everyone is familiar with, the Bar chart. Bar Charts are good for, numerical comparisons, categorical data, and ranking. Humans are very good at making direct comparisons of relative sizes from one bar to another."
                        />
                    </TextBox>
                    <Box >
                        

                    </Box>
                    <Box w="100%"  h={["400px", "800px"]}>
                        <D3Container ref={verticalRef} data={data.vertical} id="vertical" viz={BarsChart} config={config.vertical}/>
                    </Box>
                    
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="In order for this visualization to be effective there ideally are 7 or less total number of values to display. See what happens when we overload the number of items to display here, we've lost a lot of ability to decern individual comparisons, and only tend to see the overall trend and average of the data."
                        />
                    </TextBox>
                    <Box w="100%" h={["400px", "800px"]}>
                        <D3Container ref={verticalOverloadRef} data={data["vertical-overload"]} id="vertical-overload" viz={BarsChart} config={config["vertical-overload"]}/>
                    </Box>
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="If you feel you absolutely must have this many data points, consider using color to highlight the area of interest in the viz, to help guide the reader to the important information"
                        />
                    </TextBox>
                    <Box w="100%"  h={["400px", "800px"]}>
                        <D3Container ref={verticalHighlightRef} data={data["vertical-overload"]} id="vertical-highlight" viz={BarsChart} config={config["vertical-highlight"]}/>
                    </Box>
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="Generally with large number of data points as this showed it is better to switch instead to a horizontal bar chart, and explicity sort and rank the entries. This is how humans naturally perceive this visualization."
                        />
                    </TextBox>
                    <Box w="100%"  h={["500px", "1000px"]}>
                        <D3Container ref={horizontalRef} data={data["vertical-overload"]} id="horizontal" viz={BarsChart} config={config["horizontal"]}/>
                    </Box>

                    <SiteText 
                        type="subtitle"
                        text="Lolipop Chart"
                    />
                    <Box my="20px"/>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="In some instances also consider using a Lollipop chart instead of bars. It is for essentially the same data/uses, but it can be easier to discern when there are lots of data that are very close to either other in values. Also when using Lollipop chart always make sure to sort your data, otherwise it looks very messy."
                        />
                    </TextBox>
                    <Box w="100%"  h={["400px", "800px"]}>
                        <D3Container ref={lolipopRef} data={data['vertical-overload']} id="lolipop" viz={LolipopChart} config={config.lolipop}/>
                    </Box>

                    <SiteText 
                        type="subtitle"
                        text="Stacked Bars Chart"
                    />
                    <Box my="20px"/>
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="Another flavor of bar charts is a Stacked Bar chart, which is where within a single bar you set inlay multiple pieces of data. This is very good at showing section breakdowns between groups."
                        />
                    </TextBox>
                    <Box w="100%" h={["400px", "800px"]} py="30px">
                        <D3Container ref={stackedRef} data={data["stacked"]} id="stacked" viz={StackedBarsChart} config={config["stacked"]}/>
                    </Box>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="Here we can see a great example of the use of stacked bars and color to show breakdown of different values over time and how the shift grew or shrunk"
                        />
                    </TextBox>

                    <Center w="100%" py={["20px","20px","50px","50px"]}>
                        <Image src={music_revenue} border="1px solid #ababab" w={["100%", "80%"]}/>
                    </Center>

                    <SiteText 
                        type="subtitle"
                        text="Diverging Stacked Bars Chart"
                    />
                    <Box my="20px"/>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="Another common data format for stacked bars is a Diverging Stacked bar chart, where the values have an inherent positive and negative value in some way. Always put this 'zero' point in the middle of your viz to show distances from it."
                        />
                    </TextBox>

                    <Center w="100%" py={["20px","20px","50px","50px"]}>
                        <Image src={diverging_stacked} border="1px solid #ababab"  w={["100%", "90%"]}/>
                    </Center>
                    
                </CardContainer>
            </Box>
        </Center>
    )
}