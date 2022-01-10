import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "./../../components/D3Container";
import DonutChart from "./../../components/d3/DonutChart";

import {data, config} from "./DonutData";

export const Donut = () => {
    const basicDonutRef = useRef();
    const overloadedDonutRef = useRef();


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="75%" maxW="1500px">
                <CardContainer title="Donut/Pie Charts">
                    <Box>
                        <Text className="description">
                            The Donut/Pie Chart are also an extremely common visualization tool that everyone has probably encountered. Donut Charts are very good for:
                        </Text>
                        <UnorderedList pl="20px" className="description">
                            <ListItem> Displaying parts of the whole </ListItem>
                            <ListItem> Relative comparisons </ListItem>
                            <ListItem> Compactness </ListItem>
                        </UnorderedList>
                        <Box w="100%" h="800px">
                            <D3Container ref={basicDonutRef} data={data.basic} id="basic-donut" viz={DonutChart} config={config.basic}/>
                        </Box>
                        <Text className="description">
                            The Donut chart is even more so necessary to have a relatively low number of slices present. Any more than about 7 segments and the chart becomes quickly unreadable and unuseful. Note here with a large number of items we are forced to use a very diverse color set
                        </Text>
                    </Box>
                    <Box w="100%" h="800px">
                        <D3Container ref={overloadedDonutRef} data={data.donutOverloaded} id="basic-donut" viz={DonutChart} config={config.donutOverloaded}/>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}