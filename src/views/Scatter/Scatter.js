import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, UnorderedList, ListItem, List, Stack, Image, Spinner, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack, Button, ButtonGroup, Icon, HStack} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";
import {D3Container} from "../../components/D3Container";

import BubblesChart from "./../../components/d3/BubblesChart";

import * as d3 from "d3";
import {config} from "./ScatterConfig";

import {FaPlay, FaPause} from "react-icons/fa";
import {world_data} from "./ScatterData";

import {TextBox} from "./../../components/TextBox";

let interval



export const Scatter = () => {
    const scatterInteractiveRef = useRef();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [sliderValue, setSliderValue] = useState(1800)
    const yearRef = useRef(1800);
    const [continents, setContinents] = useState(['asia', 'africa', 'europe', 'americas'])
    const [asia, setAsia] = useState(true)
    const [africa, setAfrica] = useState(true)
    const [americas, setAmericas] = useState(true)
    const [europe, setEurope] = useState(true)

    const [playing, setPlaying] = useState(false);
    const [scaling, setScaling] = useState(true)

    useEffect(() => {
        let tmp = world_data.map(year => {
            return {countries: year["countries"].filter(country => {
                const dataExists = (country.income && country.life_exp)
                return dataExists
            }).map(country => {
                country.income = +country.income
                country.life_exp = +country.life_exp
                return country
            }), year: year.year}
        })
        setData(tmp);
        setLoading(false);
        // d3.json("/world_life_exp.json").then((d) => {
        //     let tmp = d.map(year => {
        //         return {countries: year["countries"].filter(country => {
        //             const dataExists = (country.income && country.life_exp)
        //             return dataExists
        //         }).map(country => {
        //             country.income = +country.income
        //             country.life_exp = +country.life_exp
        //             return country
        //         }), year: year.year}
        //     })
        //     setData(tmp);
        //     setLoading(false);
        //   });
    }, [])

    useEffect(() => {
        if (playing) {
            yearRef.current = sliderValue
        }
    }, [sliderValue])

    const sliderUpdate = (val) => {
        setSliderValue(val)
        scatterInteractiveRef.current.year(val)
    }

    const continentClick = (val) => {
        let tmp = continents;
        if (tmp.includes(val)) tmp = tmp.filter(c => c !== val)
        else tmp.push(val)
        scatterInteractiveRef.current.continents(tmp)
        setContinents(tmp)
    }

    const playClick = () => {
        if (!playing) {
            interval = setInterval(function(){
                if (yearRef.current >= 2014 || sliderValue >= 2014) {
                    clearInterval(interval)
                    return;
                }
                setSliderValue(year => year + 1)
                scatterInteractiveRef.current.year(yearRef.current + 1)

            }, 200)
        } else clearInterval(interval)
        setPlaying(e=> !e)
    }

    const scalingClick = () => {
        scatterInteractiveRef.current.mode(!scaling)
        setScaling(e=> !e)
    }


    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="interactivity">
                <CardContainer title="Interactivity & Data Dimensions">
                    <Box>
                        <TextBox>
                            <Text className="description">
                                Interactions with visualizations can give additional dimensions of data, as well as allow the user to explore the data presented in better ways. Not all visualizations warrant interactions, but once you start getting into either large number of displayed items, or want the ability for the user to ascertain very specific data points interactions can be a good idea
                            </Text>
                        </TextBox>
                        {!loading ? 
                            <Box w="100%">
                                <Center  w="100%" py="20px">
                                    <HStack 
                                        w="100%" 
                                        spacing={["50px", "50px", "50px", "50px"]} 
                                        px="30px" 
                                        ml="40px"
                                    >
                                    <Button onClick={()=> {playClick()}} variant="outline">
                                            <Icon
                                                color="blue.500"
                                                as={!playing ? FaPlay : FaPause}
                                            />
                                        </Button>
                                    <Slider aria-label='slider-ex-6' onChange={sliderUpdate} w="80%" defaultValue={1800} min={1800} max={2014} step={1}>
                                        <SliderMark value={1800} mt='3' ml='-2.5' fontSize='md'>
                                            1800
                                        </SliderMark>
                                        <SliderMark value={1900} mt='3' ml='-2.5' fontSize='md'>
                                            1900
                                        </SliderMark>
                                        <SliderMark value={2014} mt='3' ml='-2.5' fontSize='md'>
                                            2014
                                        </SliderMark>
                                        <SliderMark
                                            value={sliderValue}
                                            textAlign='center'
                                            fontSize="18px"
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            borderRadius="5px"
                                        >
                                            {sliderValue}
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    </HStack>
                                </Center>
                                <Center w="100%" mt="35px">
                                    <ButtonGroup variant="outline" spacing={[8,8,3,8]}>
                                        <Button
                                            borderColor={asia ? "#1776b6" : "#ababab"}
                                            border={"2px"}
                                            color={asia ? "#1776b6" : "#ababab"} 
                                            onClick={()=> {
                                                continentClick('asia')
                                                setAsia(e=> !e)
                                            }} 
                                            fontSize={["14px", "14px", "16px", "20px" ]}
                                            fontWeight={700} 
                                            px={["30px","30px","15px","30px"]}
                                        >
                                            Asia
                                        </Button>
                                        <Button
                                            borderColor={africa ? "#ff7f00" : "#ababab"} 
                                            border={"2px"}
                                            color={africa ? "#ff7f00" : "#ababab"} 
                                            onClick={()=> {
                                                continentClick('africa')
                                                setAfrica(e=> !e)
                                            }} 
                                            fontSize={["14px", "14px", "16px", "20px" ]}
                                            fontWeight={700} 
                                            px={["30px","30px","15px","30px"]}
                                        >
                                            Africa
                                        </Button>
                                        <Button 
                                            borderColor={europe ? "#24a121" : "#ababab"} 
                                            border={"2px"}
                                            color={europe ? "#24a121" : "#ababab"} 
                                            onClick={()=> {
                                                continentClick('europe')
                                                setEurope(e=> !e)
                                            }} 
                                            fontSize={["14px", "14px", "16px", "20px" ]}
                                            fontWeight={700} 
                                            px={["30px","30px","15px","30px"]}
                                        >
                                            Europe
                                        </Button>
                                        <Button
                                            borderColor={americas ? "#d8241f" : "#ababab"}
                                            border={"2px"} 
                                            color={americas ? "#d8241f" : "#ababab"} 
                                            onClick={()=> {
                                                continentClick('americas')
                                                setAmericas(e=> !e)
                                            }} 
                                            fontSize={["14px", "14px", "16px", "20px" ]}
                                            fontWeight={700}
                                            px={["30px","30px","15px","30px"]}
                                        >
                                            Americas
                                        </Button>
                                        <Button 
                                            px="30px" 
                                            onClick={()=> scalingClick()} 
                                            w={["200px", "200px", "200px", "200px"]}
                                            fontSize={["14px", "14px", "16px", "20px" ]}
                                        >
                                            {scaling? "Display: Logramithic" : "Display: Linear"}
                                        </Button>
                                    </ButtonGroup>
                                </Center>
                                <Box w="100%" h="800px">
                                    <D3Container ref={scatterInteractiveRef} data={data} id="interactive-bubbles" viz={BubblesChart} config={config.interactive} />
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
                                The above visualization allows the user control of the 'time' axis in this, allowing play through historical data, in addition to filtering and hover tooltips for specific pieces of information. These can allow the user to discover relationships and trends in the data, which otherwise would have been very hard to see.
                            </Text>
                        </TextBox>
                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}