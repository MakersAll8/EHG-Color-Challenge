import * as util from "./shared/distance";

addEventListener('message', e=>{
    const data = e.data
    const rowCount = 128
    const columnCount = 256
    // calculate distance from designated random color
    let stepsDistance = data.steps.map((step) => {
        return step.concat([util.cieLabDistance94(step, data.centerColor)])
    })
    // sort colors based on distance
    stepsDistance.sort((c1, c2) => {
        return c1[3] - c2[3]
    })

    // initialize matrix for displaying colors in a rectangle
    let outputColors = []
    for (let i = 0; i < rowCount; i++) {
        outputColors[i] = []
        for (let j = 0; j < columnCount; j++) {
            outputColors[i][j] = null
        }
    }
    // traverse the matrix and assign a color
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (outputColors[i][j] === null) {
                outputColors[i][j] = stepsDistance.shift()
            }
        }
    }
    postMessage(outputColors)
})
