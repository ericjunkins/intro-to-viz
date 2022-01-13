export const fontSizes = {
    label: {
        sm: "12px", md: "14px", lg: "16px", xl: "18"
    },
    axis: {
        sm: "12px", md: "14px", lg: "16px", xl: "18"
    }
}

export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1200
}

export const getSize = (width) => {
    if (width <= breakpoints.sm) return "sm"
    else if (width <= breakpoints.md) return "md"
    else if (width <= breakpoints.lg) return "lg"
    else return "xl"
}