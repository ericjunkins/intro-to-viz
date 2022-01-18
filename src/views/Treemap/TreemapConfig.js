const generateOeeData = () => {
    const total = 100
    const configs = {
        harvest: 0.7,
        standby: 0.2,

        pick_successful: 0.5,
        pick_unseccessful: 0.3,
        driving: 0.15,

        arm_standby: 0.18,
        arm_prep: 0.3,
        arm_pick: 0.2,
        arm_image: 0.12,
        arm_qc: 0.04,
        arm_simple_move: 0.06,

        scrape_by: 0.3,
        depth_failure: 0.5,
        other: 0.2
    }


    let h = Math.min(configs.harvest, Math.random() * configs.harvest + configs.harvest * 0.7)
    let s = Math.min(configs.standby, Math.random() * configs.standby + configs.standby * 0.7)
    let d = 1 - h - s

    const harvest = total * h,
        standby = total * s,
        dead = total * d

    let pick_successful = Math.min(configs.pick_successful, Math.random() * configs.pick_successful + configs.pick_successful/2)
    let pick_unseccessful = Math.min(configs.pick_unseccessful, Math.random() * configs.pick_unseccessful + configs.pick_unseccessful/2)
    let driving = Math.min(configs.driving, Math.random() * configs.driving + configs.driving/2)
    let tray_change = pick_successful - pick_unseccessful - driving


    let arm_standby = Math.min(configs.arm_standby, Math.random() * configs.arm_standby + configs.arm_standby/2)
    let arm_prep = Math.min(configs.arm_prep, Math.random() * configs.arm_prep + configs.arm_prep/2)
    let arm_pick = Math.min(configs.arm_pick, Math.random() * configs.arm_pick + configs.arm_pick/2)
    let arm_image = Math.min(configs.arm_image, Math.random() * configs.arm_image + configs.arm_image/2)
    let arm_qc = Math.min(configs.arm_qc, Math.random() * configs.arm_qc + configs.arm_qc/2)
    let arm_simple_move = 1 - arm_standby - arm_prep - arm_pick - arm_image - arm_qc
    
    let scrape_by = Math.min(configs.scrape_by, Math.random() * configs.scrape_by + configs.scrape_by * 0.5)
    let depth_failure = Math.min(configs.depth_failure, Math.random() * configs.depth_failure + configs.depth_failure * 0.5)
    let other = Math.min(configs.other, Math.random() * configs.other + configs.other * 0.5)

    let arr = [
        {name: "OEE", parent: null, value: 0, percent: 100},
        {name: 'harvest', parent: "OEE", value: 0, percent: harvest},
        {name: 'standby', parent: "OEE", value: standby, percent: standby},
        {name: 'dead', parent: "OEE", value: dead, percent:  dead},
        {name: 'successful pick', parent: 'harvest', value: harvest * pick_successful, percent: harvest * pick_successful },
        {name: 'unsuccessful pick', parent: 'harvest', value: harvest * pick_unseccessful, percent: harvest * pick_unseccessful},
        {name: 'driving', parent: 'harvest', value: harvest * driving, percent: harvest * driving},
        {name: 'tray change', parent: 'harvest', value: harvest * tray_change, percent: harvest * tray_change},
        {name: 'arm standby', parent: 'successful pick', value: harvest *pick_successful * arm_standby, percent: harvest *pick_successful * arm_standby},
        {name: 'arm prep', parent: 'successful pick', value: harvest *pick_successful * arm_prep, percent: harvest *pick_successful * arm_prep},
        {name: 'arm pick', parent: 'successful pick', value: harvest *pick_successful * arm_pick, percent: harvest *pick_successful * arm_pick},
        {name: 'arm image', parent: 'successful pick', value: harvest *pick_successful * arm_image, percent: harvest *pick_successful * arm_image},
        {name: 'arm qc', parent: 'successful pick', value: harvest * pick_successful * arm_qc, percent: harvest * pick_successful * arm_qc},
        {name: 'arm simple move', parent: 'successful pick', value: harvest *pick_successful * arm_simple_move, percent: harvest *pick_successful * arm_simple_move},
        {name: "scrape by", parent: 'unsuccessful pick', value: harvest * pick_unseccessful * scrape_by, percent: harvest * pick_unseccessful * scrape_by},
        {name: "depth failure", parent: 'unsuccessful pick', value: harvest * pick_unseccessful * depth_failure, percent: harvest * pick_unseccessful * depth_failure},
        {name: "other", parent: 'unsuccessful pick', value: harvest * pick_unseccessful * other, percent: harvest * pick_unseccessful * other}
    ]

    arr.forEach(function(d, i){
        d.id = i
    })
    return arr
}

export const data = {
    basic: generateOeeData()
}

export const config = {
    basic: {
        id: 'basic-treemap',
        margin: { top: 0, bottom: 0, left: 0, right: 0},
    },
    margins: {
        sm: { top: 0, bottom: 0, left: 0, right: 0},
        md: { top: 0, bottom: 0, left: 0, right: 0},
        lg: { top: 0, bottom: 0, left: 0, right: 0},
        xl: { top: 50, bottom: 50, left: 50, right: 50},
    }
}