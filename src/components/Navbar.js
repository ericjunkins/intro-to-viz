import React, {useState} from "react";
import {Center, Box, Flex, Text, HStack, Button, SimpleGrid} from "@chakra-ui/react";
import styled from "styled-components";



const NavButton = styled.button`
    background: none;
    cursor: pointer;
`

const Navbar = ({size}) => {

    let navs = [
        {name: "Intro", link: "/intro-to-viz/#intro"},
        {name: "Bar", link: "/intro-to-viz/#bar"},
        {name: "Donut", link: "/intro-to-viz/#donut"},
        {name: "Scatter", link: "/intro-to-viz/#scatter"},
        {name: "Treemap", link: "/intro-to-viz/#treemap"},
        {name: "Radar", link: "/intro-to-viz/#radar"},
        {name: "Hexbin Map", link: "/intro-to-viz/#hexbin"},
        {name: "Wordcloud", link: "/intro-to-viz/#wordcloud"},
        {name: "Chord", link: "/intro-to-viz/#chord"},
        {name: "Interactivity", link: "/intro-to-viz/#interactivity"},
        {name: "Colors", link: "/intro-to-viz/#colors"}
    ]

    const navTo = (loc) => {
        window.location.replace(loc)
    }
    const buttons = navs.map((d,i)=>
        <Center
            key={"nav-" + i}
            borderRight={i != navs.length -1 ? "1px solid #ababab" : "none"}  
            px={["20px","20px","10px","10px"]}
        >
            <Button
                onClick={() => navTo(d.link)}
                bg="none"
                boxShadow="none"
                _hover={{background: "none", color: "#42a6cc"}}
                _focus={{border: "none", background: "none"}}
                _focusVisible={{border: "none", background: "none"}}
                // 
            >
                <Text fontSize={["16px","16px","14px","16px"]} fontWeight={500} color="#033345"> {d.name} </Text>
            </Button>
        </Center>
        
    )

    return (
        <Box w="100%">
            {size.width > 600? 
                <Center 
                    background="#f5f5f5" 
                    py={2} 
                    w="100%"
                    // px={[12, 20]} 
                    // boxShadow="2px 2px 2px #ababab" 
                    borderBottom="1px solid #333"
                    position="fixed" 
                    className="navbar" 
                    py="5px"
                >
                    <SimpleGrid columns={[navs.length/2, navs.length/2, navs.length/2, navs.length]}
                        // spacing={["15px", "15px", "30px", "45px"]} 
                        w={["100%","100%","100%","75%"]} 
                        color="#333">
                        {buttons}
                    </SimpleGrid>
                </Center>
                : null
            }
        </Box>
        
    )
}

export default Navbar;