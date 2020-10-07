export const colorSteps = () => {
    let steps = []
    for (let r = 8; r <= 256; r = r + 8) {
        for (let g = 8; g <= 256; g = g + 8) {
            for (let b = 8; b <= 256; b = b + 8) {
                steps.push([r, g, b])
            }
        }
    }
    return steps
}
