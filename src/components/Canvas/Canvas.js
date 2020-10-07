import React, {useEffect, useRef, useState} from "react";
import classes from './Canvas.css';
import * as util from '../../shared/distance';
import {colorSteps} from '../../shared/color';
import Button from "../UI/Button/Button";

const rowCount = 128
const columnCount = 256

const Canvas = () => {
    const randomIndex = () => {
        return Math.floor(Math.random() * 32768);
        // return 0
    }
    const [initialColorIndex, setInitialColorIndex] = useState(randomIndex())

    const handleGenerateAnother = () => {
        setInitialColorIndex(randomIndex())
    }


    const canvasRef = useRef();

    useEffect(() => {
        // get ref to canvas
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');

        // general all 15-bit colors
        let steps = colorSteps()

        // pick a random color for the center point
        // const initialColorIndex = randomIndex()
        const centerColor = steps[initialColorIndex]

        // calculate distance from designated random color
        let stepsDistance = steps.map((step) => {
            return step.concat([util.cieLabDistance94(step, centerColor)])
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

        // flatten matrix into data array
        let imageData = ctx.createImageData(columnCount, rowCount)
        let k = 0;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                imageData.data[k] = outputColors[i][j][0]
                imageData.data[k + 1] = outputColors[i][j][1]
                imageData.data[k + 2] = outputColors[i][j][2]
                imageData.data[k + 3] = 255
                k += 4
            }
        }

        // draw on canvas
        ctx.putImageData(imageData, 20,10)

    }, [initialColorIndex])

    return (
        <div className={classes.Canvas}>
            <canvas className={classes.Canvas} ref={canvasRef}/>
            <Button clicked={handleGenerateAnother} btnType="Success">Generate Another Image</Button>
        </div>
    )
}

export default Canvas

