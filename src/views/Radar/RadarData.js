const getRandomValue = (max, additive) => {
    return Math.round(Math.random() * max) + additive
}

export const data = {
    basic: {
        data: [
            {name: "Cooper", data: [
                {label: "Cuteness", value: 5, anchor: "middle"},
                {label: "Size", value: 5, anchor: "end"},
                {label: "Energy", value: 4, anchor: "end"},
                {label: "Pick-up-ability", value: 1, anchor: "end"},
                {label: "Treat fiend", value: 3, anchor: "start"},
                {label: "Sass", value: 1, anchor: "start"},
                {label: "Likes to be Pet", value: 5, anchor: "start"}
            ]},
            {name: "Swanson", data: [
                {label: "Cuteness", value: 5},
                {label: "Size", value: 2},
                {label: "Energy", value: 3},
                {label: "Pick-up-ability", value: 5},
                {label: "Treat fiend", value: 5},
                {label: "Sass", value: 3},
                {label: "Likes to be Pet", value: 2}
            ]},
            {name: "Lucy", data: [
                {label: "Cuteness", value: 5},
                {label: "Size", value: 4},
                {label: "Energy", value: 2},
                {label: "Pick-up-ability", value: 2},
                {label: "Treat fiend", value: 2},
                {label: "Sass", value: 5},
                {label: "Likes to be Pet", value: 3}
            ]},
            {name: "Kona", data: [
                {label: "Cuteness", value: 5},
                {label: "Size", value: 3},
                {label: "Energy", value: 5},
                {label: "Pick-up-ability", value: 5},
                {label: "Treat fiend", value: 2},
                {label: "Sass", value: 2},
                {label: "Likes to be Pet", value: 4}
            ]}
        ],
        traits: ["Cuteness", "Size", "Energy", "Pick-up-ability", "Treat fiend", "Sass", "Likes to be Pet"]
    }
    
}

export const config = {
    basic: {
        id: 'basic-radar',
        margin: { top: 50, bottom: 50, left: 50, right: 50},
        type: "basic",
        groups: ["Cooper", "Swanson", "Lucy", "Kona"],
        colors: ["#1a759f", "#f28518", "#32b32b", "#e317a6"]
    }
}