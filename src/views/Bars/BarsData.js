const getRandomValue = (max, additive) => {
    return Math.round(Math.random() * max) + additive
}

export const data = {
    vertical: [
        {name: "F51", value: 1324},
        {name: "F52", value: 793},
        {name: "F53", value: 910},
        {name: "F54", value: 1010},
        {name: "F55", value: 735},
        {name: "F56", value: 679},
        {name: "F57", value: 431},
        {name: "F58", value: 1210}
    ],
    "vertical-overload": [
        {name: "F51", value: getRandomValue(700, 500)},
        {name: "F52", value: getRandomValue(700, 500)},
        {name: "F53", value: getRandomValue(700, 500)},
        {name: "F54", value: getRandomValue(700, 500)},
        {name: "F55", value: getRandomValue(700, 500)},
        {name: "F56", value: getRandomValue(700, 500)},
        {name: "F57", value: getRandomValue(700, 500)},
        {name: "F58", value: getRandomValue(700, 500)},
        {name: "F59", value: getRandomValue(700, 500)},
        {name: "F60", value: getRandomValue(700, 500)},
        {name: "F61", value: getRandomValue(700, 500)},
        {name: "F62", value: getRandomValue(700, 500)},
        {name: "F63", value: getRandomValue(700, 500)},
        {name: "F64", value: getRandomValue(700, 500)},
        {name: "F65", value: getRandomValue(700, 500)},
        {name: "F66", value: getRandomValue(700, 500)},
        {name: "F67", value: getRandomValue(700, 500)},
        {name: "F68", value: getRandomValue(700, 500)},
        {name: "F69", value: getRandomValue(700, 500)},
        {name: "F70", value: getRandomValue(700, 500)},
        {name: "F71", value: getRandomValue(700, 500)},
        {name: "F72", value: getRandomValue(700, 500)},
        {name: "F73", value: getRandomValue(700, 500)}
    ],
    "stacked" : [
        {group: "F51", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F52", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F53", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F54", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F55", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F56", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F57", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "F58", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
    ]
}

export const config = {
    vertical: {
        id: 'vertical-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Berries Picked", x: "Robot"},
        type: "vertical",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "vertical-overload": {
        id: 'vertical-overload-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Berries Picked", x: "Robot"},
        type: "vertical",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "vertical-highlight": {
        id: 'vertical-highlight-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Berries Picked", x: "Robot"},
        type: "vertical-highlight",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "horizontal": {
        id: 'horizontal',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {x: "Total Berries Picked", y: "Robot"},
        type: "horizontal",
        orientation: 'horizontal',
        color: "#42a6cc"
    },
    "lolipop": {
        id: 'lolipop',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {x: "Total Berries Picked", y: "Robot"},
        type: "lolipop",
        orientation: 'horizontal',
        color: "#42a6cc"
    },
    "stacked": {
        id: 'stacked',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Picks Per Hour", x: "Robot"},
        type: "vertical",
        orientation: 'vertical',
        // colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"],
        colors: ["#084081", "#0863a7", "#42a6cc", "#8fd4bd"]
    },
    margins: {
        sm: { top: 20, bottom: 50, left: 60, right: 20},
        md: { top: 20, bottom: 50, left: 60, right: 20},
        lg: { top: 50, bottom: 150, left: 100, right: 50},
        xl: { top: 50, bottom: 150, left: 100, right: 50},
    }
}