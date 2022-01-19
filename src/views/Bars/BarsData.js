const getRandomValue = (max, additive) => {
    return Math.round(Math.random() * max) + additive
}

export const data = {
    vertical: [
        {name: "BB-1", value: 1324},
        {name: "BB-2", value: 793},
        {name: "BB-3", value: 910},
        {name: "BB-4", value: 1010},
        {name: "BB-5", value: 735},
        {name: "BB-6", value: 679},
        {name: "BB-7", value: 431},
        {name: "BB-8", value: 1210}
    ],
    "vertical-overload": [
        {name: "B-1", value: getRandomValue(700, 500)},
        {name: "B-2", value: getRandomValue(700, 500)},
        {name: "B-3", value: getRandomValue(700, 500)},
        {name: "B-4", value: getRandomValue(700, 500)},
        {name: "B-5", value: getRandomValue(700, 500)},
        {name: "B-6", value: getRandomValue(700, 500)},
        {name: "B-7", value: getRandomValue(700, 500)},
        {name: "B-8", value: getRandomValue(700, 500)},
        {name: "B-9", value: getRandomValue(700, 500)},
        {name: "B-10", value: getRandomValue(700, 500)},
        {name: "B-11", value: getRandomValue(700, 500)},
        {name: "B-12", value: getRandomValue(700, 500)},
        {name: "B-13", value: getRandomValue(700, 500)},
        {name: "B-14", value: getRandomValue(700, 500)},
        {name: "B-15", value: getRandomValue(700, 500)},
        {name: "B-16", value: getRandomValue(700, 500)},
        {name: "B-17", value: getRandomValue(700, 500)},
        {name: "B-18", value: getRandomValue(700, 500)},
        {name: "B-19", value: getRandomValue(700, 500)},
        {name: "B-20", value: getRandomValue(700, 500)},
        // {name: "B-21", value: getRandomValue(700, 500)},
        // {name: "B-22", value: getRandomValue(700, 500)},
        // {name: "B-23", value: getRandomValue(700, 500)}
    ],
    "stacked" : [
        {group: "BB-1", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-2", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-3", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-4", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-5", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-6", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-7", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
        {group: "BB-8", pick: getRandomValue(200, 100), miss: getRandomValue(100, 15), backoff: getRandomValue(100, 35), drop: getRandomValue(100, 10)},
    ]
}

export const config = {
    vertical: {
        id: 'vertical-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Watermelons Thrown", x: "Robot"},
        type: "vertical",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "vertical-overload": {
        id: 'vertical-overload-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Watermelons Thrown", x: "Robot"},
        type: "vertical",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "vertical-highlight": {
        id: 'vertical-highlight-bars',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Total Watermelons Thrown", x: "Robot"},
        type: "vertical-highlight",
        orientation: 'vertical',
        color: "#42a6cc"
    },
    "horizontal": {
        id: 'horizontal',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {x: "Total Watermelons Thrown", y: "Robot"},
        type: "horizontal",
        orientation: 'horizontal',
        color: "#42a6cc"
    },
    "lolipop": {
        id: 'lolipop',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {x: "Total Watermelons Thrown", y: "Robot"},
        type: "lolipop",
        orientation: 'horizontal',
        color: "#42a6cc"
    },
    "stacked": {
        id: 'stacked',
        margin: { top: 50, bottom: 150, left: 100, right: 50},
        labels: {y: "Throws Per Hour", x: "Robot"},
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