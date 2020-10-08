import * as util from "./shared/distance";

addEventListener('message', e => {
    const data = e.data
    const rowCount = 128
    const columnCount = 256
    // calculate distance from designated random color
    let stepsDistance = data.steps.map((step) => {
        return step.concat([util.cieLabDistance(step, data.centerColor)])
        // return step.concat([util.vectorDistance(step, data.centerColor)])
        // return step.concat([util.sRgbDistance(step, data.centerColor)])
        // return step.concat([util.redMeanDistance(step, data.centerColor)])
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

    // traversing closest Manhattan neighbors
    outputColors[util.centerPoint[0]][util.centerPoint[1]] = stepsDistance.shift()
    for (let i = 0; i <= util.centerPoint[0] + util.centerPoint[1]; i++) {
        let neighbors = util.centerManhattanNeighbors(i)
        for (let n = 0; n < neighbors.length; n++) {
            let row = neighbors[n][0]
            let column = neighbors[n][1]
            if (outputColors[row][column] === null) {
                outputColors[row][column] = stepsDistance.shift()
            }
        }
    }

    postMessage(outputColors)
})
