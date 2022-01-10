import React from "react";

import {Box, Center, Text, VStack, Flex} from "@chakra-ui/react";

export const CardContainer = ({title, children, height}) => {

    return (
        <Box border="1px solid #000" boxShadow="5px 5px 5px 5px #343434" px="20px" borderRadius="10px" w="100%" h={height ? height : "100%"} pb="20px">
            {title ? 
                <Flex justify="space-between" w="100%"  pt="10px" mb="20px">
                    <Text fontWeight={700} fontSize="26px" lineHeight="26px" py="0px" my="5px"> {title} </Text>
                </Flex>
                : null
            }
            {children}
        </Box>
    )
}