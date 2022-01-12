import React, {useState, useEffect} from "react";
import {Box, Center, Text, VStack, HStack, Image, Link, UnorderedList, ListItem, SimpleGrid} from "@chakra-ui/react";

import {TextBox} from "./../../components/TextBox";
import texas from "./../../assets/texas-heatmap.png";
import minful_colors from "./../../assets/mindful_colors.png";
import color_blind from "./../../assets/color_blind.png";
import consistent_charts from "./../../assets/consistent_charts.png";
import meaningfulness from "./../../assets/meaningfulness.png";
import chroma from "./../../assets/chroma_js.png";
import color_theif from "./../../assets/color_theif.png";
import coolors from "./../../assets/coolors_co.PNG";
import data_color_picker from "./../../assets/data_color_picker.png";


import {SiteText} from "./../../components/SiteText";

const ColorBox = ({color, w="200px"}) => {
    return (
        <Center py="20px" w="100%" h="100%" px={["20px", "20px", "20px", "5px"]}>
            <VStack 
                border="2px solid #000" 
                w={"100%"} 
                borderRadius="5px"
            >
                <Box 
                    h={["40px","80px"]} 
                    w="100%" 
                    bg={color} 
                    borderBottom="2px solid #000" 
                    borderRadius="3px 3px 0px 0px"
                />
                <Center w="100%">
                    <Text py="5px" fontSize={["14px","16px"]} fontWeight={500}> {color} </Text>
                </Center>
            </VStack>
        </Center>
    )
}

export const ColorSelection = () => {

    let schemeCategory10 = ["#1776b6", "#ff7f00", "#24a121", "#d8241f", "#9564bf", "#8d5649", "#e574c3","#7f7f7f","#bcbf00","#00bed0"]

    let sequentialBlues = ["#caf0f8", "#ade8f4", "#90e0ef","#48cae4","#00b4d8","#0096c7","#0077b6","#023e8a","#03045e"]

    let sequentialTwoHue = ["#ffba08", "#faa307", "#f48c06","#e85d04","#dc2f02","#d00000","#9d0208","#6a040f","#370617", "#1a030b"]

    let divergent = ['#00429d', '#4771b2', '#73a2c6', '#a5d5d8', '#ffffe0', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']

    let qualitativeCards = schemeCategory10.map((d,i)=> 
        <ColorBox color={d} w="80px" key={"qual" + i}/>    
    )

    let sequentialBluesCards = sequentialBlues.map((d,i)=> 
        <ColorBox color={d} w={["80px","80px","170px","80px"]} key={"seq" + i}/>    
    )

    let sequentialTwoHueCards = sequentialTwoHue.map((d,i)=> 
        <ColorBox color={d} w="80px" key={"two-hue" + i}/>    
    )

    let divergentCards = divergent.map((d,i)=> 
        <ColorBox color={d} w="80px" key={"diverg" + i}/>    
    )

    

    return (
        <Box w="100%">
            <Center 
                w="100%" 
                h={["125px", "250px"]}
                backgroundImage={"linear-gradient(270deg, #034d69, #2e83a3, #034d69)"}
                borderBottom="3px solid #034d69"
                borderTop="2px solid #034d69"
                >
                <Text color="#fff" fontSize={["32px","42px"]} fontWeight={500}>
                Color Selection
                </Text>
            </Center>
            <Center w="100%" pb="30px" pt="50px" id="colors">
                <Box w={["100%", "100%", "100%", "1000px"]} textAlign="start" px={["20px","20px","20px",0]}>
                    <SiteText 
                        type="title"
                        text="Why is Color Important"
                    />
                    <SiteText 
                        type="standard"
                        text="Color can make or break a visualization. It can either guide the reader to the information in clear and concise ways, or be incredibly distracting and cumbersome. Take for instance this map of Texas. All the data you need is included in this viz, but it is still extremely hard to interpret because of the colors used."
                    />
                    <Image src={texas} py="40px"/>
                    
                    <Text py="20px" fontSize={["14px", "14px", "16px", "18px"]}>
                        Rather than go through a bunch of examples on my own, it's better to look at this source of 
                        <Link 
                            target="_blank"
                            href="https://www.dataquest.io/blog/what-to-consider-when-choosing-colors-for-data-visualization/"
                            color="#42a6cc"
                            px="3px"
                            fontWeight={500}
                        >
                            choosing colors in visualization
                        </Link>
                        where we can follow along with some of the do's and dont's of color selection
                    </Text>

                    <SiteText 
                        type="title"
                        text="How to select a good Palette"
                    />
                    <SiteText 
                        type="standard"
                        text="To select the a good palette for our visualization, first you have to think about what kind of data you have, and figure out which major type of palette will suit that data. The major types are:"
                    />

                    <UnorderedList fontSize="20px" px={["10px","10px","30px","30px"]} fontSize={["14px", "14px", "16px", "18px"]} pt="10px">
                        <ListItem>
                            Qualitative palettes
                        </ListItem>
                        <ListItem>
                            Sequential palettes
                        </ListItem>
                        <ListItem>
                            Diverging palettes
                        </ListItem>
                    </UnorderedList>

                    <SiteText 
                        type="title"
                        text="Qualitative Palettes"
                    />
                    <SiteText 
                        type="standard"
                        text="A qualitative palette is a group of colors that are all inherently differnt hues, distinguishable from each other. These palettes are generally used for categorical data, where each categorical variable is assigned a color. Generally these are 10 or less, as after that colors become hard to distinguish. Below is an example of a famous color set, called Scheme Category 10 by D3. This color set is one set that is maximally spaced in hue-space, to give the higest distinguishability between colors."
                    />

                    <SimpleGrid columns={[3, 3, 5, 10]}>
                        {qualitativeCards}
                    </SimpleGrid>

                    <SiteText 
                        type="subtitle"
                        text="Sequential Palettes"
                    />

                    <SiteText 
                        type="standard"
                        text="Sequential palettes are sets of colors in either a single hue, or two hues, and are varying lightness across that spectrum. These are generally used for when the variable is numeric or has inherently ordered values. It can either be a continium, or discritized across the spectrum. Typically you will see that the lower values are associated with lighter colors, and higher values with darker. This is because we interpret the darker color as 'more filled in', which is expected with high value. "
                    />

                    <SiteText 
                        type="subtitle"
                        text="Sequential Blues"
                    />

                    <SiteText 
                        type="standard"
                        text="This paletee is a single hue of blue, that then is varied its' lightntess/darkness to produce a sequential set of colors"
                    />

                    <SimpleGrid columns={[3, 3, 3, 9]}>
                        {sequentialBluesCards}
                    </SimpleGrid>

                    <SiteText 
                        type="subtitle"
                        text="Sequential Two Hue"
                    />

                    <SiteText 
                        type="standard"
                        text="This paletee is two hues, a dark red and yellow, with the linear interpolation between the two, leading to a sequential set that doesn't vary in lightness, just over the hues between."
                    />

                    <SimpleGrid columns={[3, 3, 5, 10]}>
                        {sequentialTwoHueCards}
                    </SimpleGrid>

                    <SiteText 
                        type="subtitle"
                        text="Divergent Palettes"
                    />

                    <SiteText 
                        type="standard"
                        text="Diverging palettes are ones essentially two sequential palettes that share an endpoint at the central value. These are used for data sets that have a meaningful middle ground, like a positive and negative value around 0."
                    />
 
                    <SimpleGrid columns={[3, 3, 3, 9]}>
                        {divergentCards}
                    </SimpleGrid>
                    
                    <SiteText 
                        type="title"
                        text="Additional Tips for color selection and usage"
                    />

                    <SiteText 
                        type="subtitle"
                        text="Avoid unnecessary usage"
                        pb="10px"
                    />

                    <SiteText 
                        type="standard"
                        text="Even though color is an important part of data visualization, it’s wise to exercise restraint and use color only where appropriate. Not every chart you create will require multiple colors. If you have only two variables to plot, they will likely be encoded by vertical and horizontal positions or lengths. Color usually only comes in when a third variable needs to be encoded into a chart or if it’s a component of a specialist chart like a pie chart. However, there are cases where color can be added to emphasize a specific finding or as an extra highlighting encoding."
                    />

                    <Center w="100%" pb="20px" pt="20px">
                        <Image src={minful_colors}/>
                    </Center>
                    
                    <SiteText 
                        type="subtitle"
                        text="Be consistent with color across charts"
                        pb="10px"
                    />

                    <SiteText 
                        type="standard"
                        text="If you have a dashboard or report that includes multiple charts, it is a good idea to match colors between charts when they refer to the same group or entity. If colors change their meaning between charts, this can make it harder for the reader to understand the chart."
                    />

                    <Center w="100%" pb="20px" pt="20px">
                        <Image src={consistent_charts}/>
                    </Center>

                    <SiteText 
                        type="subtitle"
                        text="Leverage meaningfulness of color"
                        pb="10px"
                    />

                    <SiteText 
                        type="standard"
                        text="A general rule of thumb is to avoid high levels of color saturation and brightness in order to reduce eyestrain. This also allows room for highlighting elements that are important by giving them a bolder look compared to the other elements. Similarly, the importance of gray cannot be understated to put unimportant data in the background, among other purposes."
                    />
                   
                    <Center w="100%" pb="20px" pt="20px">
                        <Image src={meaningfulness}/>
                    </Center>

                    <SiteText 
                        type="standard"
                        text="As a final thought, it’s worth noting that different cultures can associate different meanings to each hue. For example, red might be associated with passion or danger in some Western cultures, but prosperity and good fortune in some Eastern cultures. This may not be particularly important unless findings are being presented to a broad audience, but it’s another tool to keep in mind to help make your visualizations easier to grasp."
                    />

                    <SiteText 
                        type="subtitle"
                        text="Don’t forget about color blindness"
                        pt={["15px"]}
                    />

                    <SiteText 
                        type="standard"
                        text="About 4 percent of the population has some sort of color blindness, most of them males. The most common forms of color blindness cause confusion between certain shades of red and green, though there are also forms of color blindness that cause blue and yellow shades to look the same. For these reasons, it is good to try and vary a dimension other than hue alone to indicate the value associated with a color, like lightness and saturation. You can also use color-blindness simulators like Coblis to get an idea of whether your final visualization will be understandable to others and if there are potential ambiguities."
                        py="5px"
                    />

                    <Center w="100%" py={["20px","20px","20px","20px"]}>
                        <Image src={color_blind} w={["80%","80%","100%","100%"]}/>
                    </Center>

                    <SiteText 
                        type="title"
                        text="Tools for Picking Colors"
                    />

                    <SimpleGrid columns={[1,1,1,2]} spacing={["0px","40px"]}>
                        <Box>
                            <Text fontSize="22px" fontWeight={500} pt={["0px","0px","30px","50px"]}>
                                <Link target="_blank" href="https://learnui.design/tools/data-color-picker.html" color="#16546b" style={{textDecoration: "underline"}} fontSize={["20px", "20px", "18px", "24px"]}>
                                    Data Color Picker
                                </Link>
                            </Text>

                            <Center w="100%" py={["10px","10px","30px","30px"]}>
                                <Image src={data_color_picker} border="1px solid #ababab"/>
                            </Center>

                            <SiteText 
                                type="standard"
                                text="The Data Color Picker is a quick and easy to use tool for generating sequential and diverging palettes. The default “Palette” tab is best used for generating multi-hue sequential palettes rather than qualitative palettes, since the interpolation between endpoints will necessarily leave out some segment of hues in the color wheel."
                            />

                            <Text fontSize="22px" fontWeight={500} pt="20px" pt={["20px","20px","30px","50px"]}>
                                <Link target="_blank" href="https://vis4.net/palettes/#/9|s|00429d,96ffea,ffffe0|ffffe0,ff005e,93003a|1|1" color="#16546b" style={{textDecoration: "underline"}} fontSize={["20px", "20px", "18px", "24px"]}>
                                    Chroma.js
                                </Link>
                            </Text>

                            <Center w="100%" py={["10px","10px","30px","30px"]}>
                                <Image src={chroma} border="1px solid #ababab"/>
                            </Center>

                            <SiteText 
                                type="standard"
                                text="The chroma.js Color Palette Helper is a little bit more involved than Data Color Picker with its options for correcting lightness and bezier interpolation and slightly more difficult input of color values. However, it also allows for some additional freedom in setting multiple stop-points for the algorithm to try and fit a palette to. As an additional bonus, the application also includes a color blindness simulator on the same page, highlighting the most common types of deficiency where issues may crop up."
                            />

                        </Box>
                        <Box>
                            <Text fontSize="22px" fontWeight={500} pt={["20px","20px","30px","50px"]}>
                                <Link target="_blank" href="https://coolors.co/" color="#16546b" style={{textDecoration: "underline"}} fontSize={["20px", "20px", "18px", "24px"]}>
                                    Coolors
                                </Link>
                            </Text>

                            <Center w="100%" py={["10px","10px","30px","30px"]}>
                                <Image src={coolors} border="1px solid #ababab" w="100%"/>
                            </Center>
                            
                            <SiteText 
                                type="standard"
                                text="Coolors allows you to build color palettes by selecting a starting color and generating sets that will match and go well with it. It also has a giant spread of color sets others have come up with that are popular and being used a lot. It's a great place to start when wanting inspirition on a set. "
                            />

                            <Text fontSize="22px" fontWeight={500} pt={["20px","20px","30px","50px"]}>
                                <Link target="_blank" href="https://lokeshdhakar.com/projects/color-thief/" color="#16546b" style={{textDecoration: "underline"}} fontSize={["20px", "20px", "18px", "24px"]}>
                                    Color Theif
                                </Link>
                            </Text>

                            <Center w="100%" py={["10px","10px","30px","30px"]}>
                                <Image src={color_theif} border="1px solid #ababab"/>
                            </Center>

                            <SiteText 
                                type="standard"
                                text="There aren’t as many quick-and-easy tools for generating qualitative palettes as there are for sequential and diverging palettes. I want hue and Colorgorical are both quick for generating random palettes, but a bit more difficult to work with when you want to customize your values.
                                But one fun way of creating a qualitative palette is to draw inspiration from images and screencaps with appealing natural palettes. There are a few tools out there to help do this, but Color Thief is one of the easiest to work with, automatically extracting a healthy-sized palette from uploaded pictures. This doesn’t necessarily mean that you can use the extracted colors directly and in order as a visualization palette. They can be an inspirational starting point for colors that look good together, but you’ll likely need to make some tweaks and revisions to ensure that the colors you choose are effective in a visualization context."
                            />
                        </Box>
                    </SimpleGrid>
                </Box>
            </Center>
        </Box>
    )
}



