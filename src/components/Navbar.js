import React, {useState} from "react";
import {Center, Box, Flex, Text, HStack, Button} from "@chakra-ui/react";
import styled from "styled-components";



const NavButton = styled.button`
    background: none;
    cursor: pointer;
`

const Navbar = ({size}) => {

    let navs = [
        {name: "Bar", link: ""},
        {name: "Donut", link: ""},
        {name: "Scatter/Bubbles", link: ""},
        {name: "Treemap", link: ""},
        {name: "Radar", link: ""},
        {name: "Hexbin Map", link: ""},
        {name: "Wordcloud", link: ""},
        {name: "Chord", link: ""},
        {name: "Interactivity", link: ""},
    ]

    const navTo = (loc) => {
        window.location.replace(loc)
    }

    const buttons = navs.map((d,i)=>
        <Center
            key={"nav-" + i}
            borderRight={i != navs.length -1 ? "1.5px solid #333" : "none"}  
            px="20px"
        >
            <Button
                onClick={() => navTo(d.link)}
                bg="none"
                boxShadow="none"
                _hover={{background: "none", color: "#42a6cc"}}
                _focus={{border: "none", background: "none"}}
                _focus={{border: "none", background: "none"}}
                _focusVisible={{border: "none", background: "none"}}
                // 
            >
                <Text fontSize="14px" fontWeight={500}> {d.name} </Text>
            </Button>
        </Center>
        
    )

    return (
        <Center 
            background="#f5f5f5" 
            py={2} 
            w="100%" 
            px={[12, 20]} 
            boxShadow="3px 3px 3px #545454" 
            borderBottom="1px solid #333"
            position="fixed" 
            className="navbar" 
            py="5px"
        >
            <HStack 
                // spacing={["15px", "15px", "30px", "45px"]} 
                color="#333">
                {buttons}
            </HStack>
        </Center>
    )
}

export default Navbar;