import deltaE from 'delta-e'

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

export const cieLabDistance94 = (c1, c2) => {
    let lab1 = rgb2lab(c1)
    let lab2 = rgb2lab(c2)

    let color1 = {L: lab1[0], A: lab1[1], B: lab1[2]}
    let color2 = {L: lab2[0], A: lab2[1], B: lab2[2]}

    return deltaE.getDeltaE00(color1, color2)
}

const rgb2lab = (rgb) => {
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

export const centerPoint = [64, 128]
export const centerManhattanNeighbors = (distance) => {
    if (distance <= 0 || distance > (centerPoint[0] + centerPoint[1])) {
        return []
    }

    let neighbors = []
    for (let i = 0; i <= distance; i++) {
        neighbors.push([64 + i, 128 + (distance - i)])
        if ((distance - i) !== 0) {
            neighbors.push([64 + i, 128 - (distance - i)])
        }

        if (i !== 0) { // 64+0 === 64-0
            neighbors.push([64 - i, 128 + (distance - i)])
            if ((distance - i) !== 0) {
                neighbors.push([64 - i, 128 - (distance - i)])
            }
        }
    }
    return neighbors.filter(n => (n[0] >= 0 && n[0] < 128 && n[1] >= 0 && n[1] < 256))

}
