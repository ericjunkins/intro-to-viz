import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import BasicScatterPlot from "./../../components/d3/BasicScatter"
import BasicBubblesChart from "./../../components/d3/BasicBubblesChart";
import {config} from "./ScatterConfig";

import {TextBox} from "./../../components/TextBox";
import * as d3 from "d3";

export const BasicScatter = () => {
    const basicScatterRef = useRef();
    const bubbleRadiusRef = useRef();
    const bubbleAreaRef = useRef()
    const [basicData, setBasicData] = React.useState([]);
    const [bubbleData, setBubbleData] = useState([])
    const [loading, setLoading] = React.useState(true);
    const [bubbleLoading, setBubbleLoading] = useState(true);


    useEffect(() => {
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then((d) => {
            d.forEach(function(d,i){
                d.id = i
                d.petal_length = +d.Petal_Length
                d.petal_width = +d.Petal_Width
                d.sepal_length = +d.Sepal_Length
                d.sepal_width = +d.Sepal_Width
                d.species = d.Species
                delete d.Petal_Length
                delete d.Petal_Width
                delete d.Sepal_Length
                delete d.Sepal_Width
                delete d.Species
            })
            let maxX = d3.max(d, function(v){return v.sepal_length})
            let maxY = d3.max(d, function(v){return v.petal_length})

            config.basic.domain = {x: [4, maxX], y: [0, maxY]}
            setBasicData(d);
            setLoading(false);
          });

        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(d) {
            d.forEach(function(v){
                v.lifeExp = +v.lifeExp
                v.pop = +v.pop
                v.gdpPercap = +v.gdpPercap
            })
            setBubbleData(d)
            setBubbleLoading(false)
        })
    }, [])

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="scatter">
                <CardContainer title="Scatter & Bubbles Chart">
                    <Box>
                        <TextBox>
                            <Text className="description">
                                Scatter plots are used to show relationship between two variables. They can contain multiple different sets of data, which can be denoted by either markers or colors. In a scatter plot all markings are the same size. Be sure when using scatter plot to be mindful of not 
                                <Link href="https://www.data-to-viz.com/caveat/overplotting.html" color="blue.500" mx="2" target="_blank" fontWeight={500}>
                                    overcrowding.
                                </Link>
                                It is also important to understand how you want to convey individual data points and see them, or if clusters and trends are important. For the following I decided that individual points are important, and chose to make every point visible by using fill opacity less than 1 and a border around each circle. 
                            </Text>
                        </TextBox>

                        {!loading ? 
                            <Box w="100%">
                                <Box w="100%" h="800px">
                                    <D3Container ref={basicScatterRef} data={basicData} id="basic-scatter" viz={BasicScatterPlot} config={config.basic} />
                                </Box>
                            </Box>
                           
                            :
                            <Center w="100%" h="800px" >
                                <Spinner   
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' 
                                />
                            </Center>
                        }
                        <TextBox>
                            <Text className="description">
                                Next up is the Bubbles chart, which is extremely similar to the scatter plot, but uses and extra dimension to encode data, which is the size of the circle. One critical thing to make sure to do is encode your data for bubble size into the area of the circle, and not the radius. Below shows an example of how much this skews how humans percieve the data and assign weight to the values.
                            </Text>
                        </TextBox>
                        {!bubbleLoading ? 
                            <VStack>
                                <Box h="600px" w="100%">
                                    <D3Container ref={bubbleRadiusRef} data={bubbleData} id="bubbles-linear" viz={BasicBubblesChart} config={config.radius} />
                                </Box>
                                <Box h="600px" w="100%">
                                    <D3Container ref={bubbleAreaRef} data={bubbleData} id="bubbles-linear" viz={BasicBubblesChart} config={config.area} />
                                </Box>
                            </VStack>
                            :
                            <Center w="100%" h="800px" >
                                <Spinner   
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' 
                                />
                            </Center>
                        }
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}