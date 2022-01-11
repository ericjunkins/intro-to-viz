import React from "react";
import {Center, Box, Text} from "@chakra-ui/react";


export const TextBox = ({children}) => {

    return (
        <Box bg="#f5f5f5" py="10px" px="10px">
            {children}
        </Box>
    )
}