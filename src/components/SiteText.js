import React from "react";
import {Text, Box, Flex} from "@chakra-ui/react";

export const Interactivity = () => {
    return (
        <Flex ml={"20px", "50px"} pt={["20px", "20px"]}>
            <Text 
                color="#42a6cc" 
                fontWeight={600} 
                fontSize={["18px", "22px"]} 
                py="5px" 
                px="10px"
                borderRadius="10px"
                border="1px solid #545454" bg="#fff"
                boxShadow="2px 2px 4px 2px #252525"
            >
                Interactive
            </Text>
        </Flex>
           
        
    )
}

export const SiteText = ({text, type='standard', py, px, pt, pb}) => {
    let fs;
    let fw;
    if (type === "standard") fs = ["14px", "14px", "16px", "20px"]
    else if ( type === "subtitle") {
        fs = ["18px", "18px", "18px", "20px"]
        fw=600
    }
    else if ( type === "title") {
        fs = ["20px", "20px", "18px", "24px"]
        fw=700
        py=["10px", "10px", "15px", "20px"]
    }

    return (
        <Text fontSize={fs} fontWeight={fw} py={py} pt={pt} pb={pb}>
            {text}
        </Text>
    )
}