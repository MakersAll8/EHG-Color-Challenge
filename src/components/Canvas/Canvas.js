import React, {useEffect, useRef, useState} from "react";
import classes from './Canvas.css';
import {colorSteps} from '../../shared/color';
import Button from "../UI/Button/Button";
import ReactCountdownClock from 'react-countdown-clock'

const rowCount = 128
const columnCount = 256

// general all 15-bit colors
const steps = colorSteps()

const Canvas = () => {
    const randomIndex = () => {
        return Math.floor(Math.random() * 32768);
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

        // pick a random color for the center point
        // const initialColorIndex = randomIndex()
        const centerColor = steps[initialColorIndex]

        // calculate distance in worker, so that main ui is not blocked
        const worker = new Worker('../../canvas.worker.js', {type: 'module'});
        worker.postMessage({steps, centerColor});

        // do the rest after receiving results
        worker.onmessage = e => {
            let outputColors = e.data

            // flatten matrix into data array
            let imageData = ctx.createImageData(columnCount, rowCount)
            let k = 0;
            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < columnCount; j++) {
                    imageData.data[k] = outputColors[i][j][0]
                    imageData.data[k + 1] = outputColors[i][j][1]
                    imageData.data[k + 2] = outputColors[i][j][2]
                    imageData.data[k + 3] = 255 // alpha
                    k += 4
                }
            }
            // draw on canvas
            ctx.putImageData(imageData, 20, 10)
        }

    }, [initialColorIndex])

    return (
        <div className={classes.Canvas}>
            <canvas className={classes.Canvas} ref={canvasRef}/>
            <Button clicked={handleGenerateAnother} btnType="Success">Generate Another Image</Button>
            <p>Image is generated by web worker.</p>
            <p>The countdown is here to show that rapidly clicking on the button does NOT block the UI.</p>
            <ReactCountdownClock/>
        </div>
    )
}

export default Canvas

