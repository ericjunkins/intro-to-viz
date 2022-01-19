import React from "react";
import {Center, Box, Text} from "@chakra-ui/react";


export const TextBox = ({children}) => {

    return (
        <Box 
            bg="#f5f5f5" 
            py="20px" 
            px={["10px","50px"]} 
            border="1px solid #e0e0e0"
            boxShadow="2px 2px 4px 2px #545454"
        >
            {children}
        </Box>
    )
}