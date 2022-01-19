import React, {useState, useEffect, useRef} from "react";
import {Box, Center, Text, Spinner, Link, SimpleGrid, VStack, Image} from "@chakra-ui/react";
import { CardContainer } from "../../components/CardContainer";


import {TextBox} from "./../../components/TextBox";
import {SiteText, Interactivity} from "./../../components/SiteText";

import boxplot_example from "./../../assets/boxplot_example.PNG"
import boxplot_explaination from "./../../assets/boxplot_explaination.png"
import boxplot_skew from "./../../assets/boxplot_skew.PNG"

export const BoxPlot = () => {

    return (
        <Center w="100%" pt="20px" textAlign="start">
            <Box w="100%" id="boxplot">
                <CardContainer title="Boxplots">
                    <Box>
                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="Boxplots are very common ways to represent statistical data and densitites of data in a compact and readable format. Use them when you want to simplify your visualization, and what matters are not individual data points and outliers, but the mean and standard deviations."
                            />
                        </TextBox>
                        <Center w="100%" py={["20px","20px","50px","50px"]}>
                            <Image src={boxplot_example} border="1px solid #ababab"/>
                        </Center>

                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="The Q1 to Q3 region is called the Inner Quartile Region (IQR), and consists of 50% of all your data. The whiskers then extend out to incorporate the next 1.5 * IQR, so all data lying between the two whiskers is 2.698 Sigma, or 99.3% of your data, everything else is a statistical outlier."
                            />
                        </TextBox>

                        <Center w="100%"  py={["20px","20px","50px","50px"]}>
                            <Image src={boxplot_explaination} border="1px solid #ababab"/>
                        </Center>

                        <TextBox>
                            <SiteText 
                                type="standard"
                                text="Also be on the lookout for how the median might shift inside your dataset, and if the density is not symmetric about your median. The median line of the boxplot will help show you the skew of this density, along with whisker lengths"
                            />
                        </TextBox>

                        <Center w="100%"  py={["20px","20px","50px","50px"]}>
                            <Image src={boxplot_skew} border="1px solid #ababab"/>
                        </Center>

                    </Box>
                </CardContainer>
            </Box>
        </Center>
    )
}