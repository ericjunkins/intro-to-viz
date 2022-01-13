export const config = {
    basic: {
        labels: {x: "Sepal Length", y: "Petal Length"},
    },
    interactive : {
        labels: {x: "GDP Per Capita ($)", y: "Life Expectancy (Years)"},
        valuesToShow: [10000000, 250000000, 1000000000],
        startingYear: "1800",
    },
    radius: {
        labels: {x: "GDP Per Capita ($)", y: "Life Expectancy (Years)"},
        margin: { top: 50, bottom: 100, left: 100, right: 50 },
        scaling: 'radius',
        domain: {x: [0, 50000], y: [35, 90]},
        valuesToShow: [10000000, 500000000, 1000000000],
        title: "Radius Scaled (incorrect)"
    },
    area: {
        labels: {x: "GDP Per Capita ($)", y: "Life Expectancy (Years)"},
        margin: { top: 50, bottom: 100, left: 100, right: 50 },
        scaling: 'area',
        domain: {x: [0, 50000], y: [35, 90]},
        valuesToShow: [10000000, 250000000, 1000000000],
        title: "Area Scaled (correct)"
    },
    margins: {
        sm: { top: 30, bottom: 50, left: 50, right: 20},
        md: { top: 30, bottom: 20, left: 20, right: 20},
        lg: { top: 50, bottom: 100, left: 100, right: 50},
        xl: { top: 50, bottom: 100, left: 100, right: 50 },
    }
}