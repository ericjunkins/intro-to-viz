import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";
import DonutChart from "./../../components/d3/DonutChart";

import {data, config} from "./DonutData";

import pie_3d from "./../../assets/3d_pie_chart.png";

import {TextBox} from "./../../components/TextBox";
import {SiteText} from "./../../components/SiteText";

import { getSize } from "./../../helpers/FontSizes";

export const Donut = ({size}) => {
    const basicDonutRef = useRef();
    const overloadedDonutRef = useRef();


    const s = getSize(size.width)
    const m = config.margins[getSize(size.width)]

    config.basic.size = s
    config.donutOverloaded.size = s
    config.basic.margin = m
    config.donutOverloaded.margin = m

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="donut">
                <CardContainer title="Donut/Pie Charts">
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="The Donut/Pie Chart are also an extremely common visualization tool that everyone has probably encountered. Donut Charts are very good for displaying parts of the whole, relative comparisons, and having a compact visualization. In practice bar charts and donut charts contain basically the same data"
                        />
                    </TextBox>
                    <Box my="20px"/>
                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="In practice bar charts and donut charts contain basically the same data, however they are organized very differently. When choosing between them you should ask yourself, what is more important, understanding the rough percentage of whole a value is, or being able to make pairwise comparisons."
                        />
                    </TextBox>
                    <Box w="100%" h={["400px","800px"]}>
                        <D3Container ref={basicDonutRef} data={data.basic} id="basic-donut" viz={DonutChart} config={config.basic}/>
                    </Box>
                    <TextBox>
                         <SiteText 
                            type="standard"
                            text="The Donut chart is even more so necessary to have a relatively low number of slices present. Any more than about 7 segments and the chart becomes quickly unreadable and unuseful. Note here with a large number of items we are forced to use a very diverse color set"
                        />
                    </TextBox>
                    <Box w="100%" h={["400px", "800px"]}>
                        <D3Container ref={overloadedDonutRef} data={data.donutOverloaded} id="basic-donut" viz={DonutChart} config={config.donutOverloaded}/>
                    </Box>

                    <Box borderBottom="3px solid #ababab" mb="20px"/>

                    <Text fontSize="24px" fontWeight={700}>
                        3-D Pie/Donuts/Bars
                    </Text>

                    <Center py="40px">
                        <Image src={pie_3d} w={["75%", "50%"]}/>
                    </Center>

                    <TextBox>
                        <SiteText 
                            type="standard"
                            text="The appropriate time to use a 3-D pie/donut/bar chart is..... NEVER. It is never an appropriate visualization, it has no point in this world. All it does is take a perfectly good visualization, give it isometric perspective which skews how you can interpret the data, and then adds a dimension of space with no extra dimension of data. It is trash and don't ever use them. "
                        />
                    </TextBox>
                </CardContainer>
            </Box>
        </Center>
    )
}