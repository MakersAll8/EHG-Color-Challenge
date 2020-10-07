export const vectorDistance = (color1, color2) => {
    return (
        Math.pow(color1[0] - color2[0], 2)
        + Math.pow(color1[1] - color2[1], 2)
        + Math.pow(color1[2] - color2[2], 2)
    )
}

export const sRgbDistance = (color1, color2) => {
    const rBar = (color1[0] + color2[0]) / 2
    if (rBar <= 128) {
        return (
            2 * Math.pow(color1[0] - color2[0], 2)
            + 4 * Math.pow(color1[1] - color2[1], 2)
            + 3 * Math.pow(color1[2] - color2[2], 2)
        )
    } else {
        return (
            3 * Math.pow(color1[0] - color2[0], 2)
            + 4 * Math.pow(color1[1] - color2[1], 2)
            + 2 * Math.pow(color1[2] - color2[2], 2)
        )
    }
}

export const redMeanDistance = (color1, color2) => {
    const rBar = (color1[0] + color2[0]) / 2
    return (
        (2 + rBar / 256) * Math.pow(color1[0] - color2[0], 2)
        + 4 * Math.pow(color1[1] - color2[1], 2)
        + (2 + (255 - rBar) / 256) * Math.pow(color1[2] - color2[2], 2)
    )
}
