const getRandomValue = (max, additive) => {
    return Math.round(Math.random() * max) + additive
}

export const data = {
    basic: [
        {name: "Clearpath", value: getRandomValue(80, 45)},
        {name: "Roboteq", value: getRandomValue(30, 15)},
        {name: "Grippers", value: getRandomValue(15, 8)},
        {name: "Power Checks", value: getRandomValue(10, 7)},
        {name: "Cameras", value: getRandomValue(25, 10)},
    ],
    donutOverloaded: [
        {name: "Clearpath", value: getRandomValue(80, 45)},
        {name: "Roboteq", value: getRandomValue(40, 35)},
        {name: "Grippers", value: getRandomValue(75, 8)},
        {name: "Power Checks", value: getRandomValue(10, 7)},
        {name: "Zense", value: getRandomValue(25, 10)},
        {name: "Realsense", value: getRandomValue(25, 10)},
        {name: "Software Bringup", value: getRandomValue(10, 10)},
        {name: "Image Flashing", value: getRandomValue(25, 10)},
        {name: "Dog Petting", value: getRandomValue(5, 4)},
        {name: "Snacks", value: getRandomValue(5, 3)},
    ]
}

export const config = {
    basic: {
        id: 'basic-donut',
        margin: { top: 50, bottom: 50, left: 50, right: 50},
        type: "basic",
        colors: ["#184e77", "#1a759f", "#34a0a4", "#76c893", "#b5e48c"]
    },
    donutOverloaded: {
        id: 'overloaded-donut',
        margin: { top: 50, bottom: 50, left: 50, right: 50},
        type: "overloaded",
        colors: ["#1776b6", "#ff7f00", "#24a121", "#d8241f", "#9564bf", "#8d5649", "#e574c3","#7f7f7f","#bcbf00","#00bed0"]
    }
}