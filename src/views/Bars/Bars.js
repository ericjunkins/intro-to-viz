import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";
import BarsChart from "../../components/d3/BarsChart";
import StackedBarsChart from "../../components/d3/StackedBarChart";
import LolipopChart from "../../components/d3/LolipopChart";
import {config, data} from "./BarsData";

import {TextBox} from "./../../components/TextBox";

export const Bars = () => {
    const verticalRef = useRef();
    const verticalOverloadRef = useRef();
    const verticalHighlightRef = useRef();
    const horizontalRef = useRef();
    const lolipopRef = useRef();
    const stackedRef = useRef();

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%">
                <CardContainer title="Bar Graphs">
                    <TextBox>
                        <Text className="description">
                            Let's start with one of the most standard data visualizations everyone is familiar with, the Bar chart. Bar Charts are good for, Numberical comparisons, catagorical data, and ranking. Humans are very good at making direct comparisons of relative sizes from one bar to another.
                        </Text>
                    </TextBox>
                    <Box >
                        

                    </Box>
                    <Box w="100%" h="800px">
                        <D3Container ref={verticalRef} data={data.vertical} id="vertical" viz={BarsChart} config={config.vertical}/>
                    </Box>
                    
                    <TextBox>
                        <Text className="description">
                            In order for this visualization to be effective there ideally are 7 or less total number of values to display. See what happens when we overload the number of items to display here, we've lost a lot of ability to descern individual comparisons, and only tend to see the overal trend and average of the data.
                        </Text>
                    </TextBox>
                    <Box w="100%" h="800px">
                        <D3Container ref={verticalOverloadRef} data={data["vertical-overload"]} id="vertical-overload" viz={BarsChart} config={config["vertical-overload"]}/>
                    </Box>
                    <TextBox>
                        <Text className="description">
                        If you feel you absolutely must have this many data points, consider using color to highlight the area of interest in the viz, to help guide the reader to the important information
                        </Text>
                    </TextBox>
                    <Box w="100%" h="800px">
                        <D3Container ref={verticalHighlightRef} data={data["vertical-overload"]} id="vertical-highlight" viz={BarsChart} config={config["vertical-highlight"]}/>
                    </Box>
                    <TextBox>
                        <Text className="description">
                            Generally with large number of data points as this showed it is better to switch instead to a horizontal bar chart, and explicity sort and rank the entries. This is how humans naturally perceive this visualization.
                        </Text>
                    </TextBox>
                    <Box w="100%" h="1000px">
                        <D3Container ref={horizontalRef} data={data["vertical-overload"]} id="horizontal" viz={BarsChart} config={config["horizontal"]}/>
                    </Box>
                    <TextBox>
                        <Text className="description">
                            In some instances also consider using a Lolipop chart instead of bars. It is for essentially the same data/uses, but it can be easier to discern when there are lots of data that are very close to either other in values. Also when using Lolipop chart always make sure to sort your data, otherwise it looks very messy.
                        </Text>
                    </TextBox>
                    <Box w="100%" h="800px">
                        <D3Container ref={lolipopRef} data={data['vertical-overload']} id="lolipop" viz={LolipopChart} config={config.lolipop}/>
                    </Box>
                    <TextBox>
                        <Text className="description">
                            Another flavor of bar charts is a Stacked Bar chart, which is where within a single bar you set inlay multiple pieces of data. This is very good at showing section breakdowns between groups.
                        </Text>
                    </TextBox>
                    <Box w="100%" h="800px" py="30px">
                        <D3Container ref={stackedRef} data={data["stacked"]} id="stacked" viz={StackedBarsChart} config={config["stacked"]}/>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}