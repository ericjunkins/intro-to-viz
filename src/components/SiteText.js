import React from "react";
import {Text} from "@chakra-ui/react";

export const SiteText = ({text, type='standard', py, px, pt, pb}) => {
    let fs;
    let fw;
    if (type === "standard") fs = ["14px", "14px", "16px", "18px"]
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