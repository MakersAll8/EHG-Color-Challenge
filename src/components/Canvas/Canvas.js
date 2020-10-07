import React, {useEffect, useRef} from "react";
import classes from './Canvas.css';
import * as util from '../../shared/distance';
import {colorSteps} from '../../shared/color';

const Canvas = (props) => {

    const randomIndex = () => {
        // return Math.floor(Math.random() * 32768);
        return 0
    }
    const canvasRef = useRef();

    useEffect(() => {
        // get ref to canvas
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');

        // general all 15-bit colors
        let steps = colorSteps()

        // pick a random color for the center point
        const initialColorIndex = randomIndex()
        const centerColor = steps[initialColorIndex]

        let stepsDistance = steps.map((step) => {
            return step.concat([util.vectorDistance(step, centerColor)])
        })

        stepsDistance.sort((c1, c2) => {
            return c1[3] - c2[3]
        })

        let imageData = ctx.createImageData(256, 128)

        let outputColors = []
        for (let i = 0; i < 128; i++) {
            outputColors[i] = []
            for (let j = 0; j < 256; j++) {
                outputColors[i][j] = null
            }
        }

        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 256; j++) {
                if(outputColors[i][j]===null){
                    outputColors[i][j] = stepsDistance.shift()
                }
            }
        }

        let data = []
        let k = 0;
        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 256; j++) {
                data[k] = outputColors[i][j][0]
                data[k+1] = outputColors[i][j][1]
                data[k+2] = outputColors[i][j][2]
                data[k+3] = 255
                k+=4
            }
        }

        for(let i = 0; i < imageData.data.length; i++){
            imageData.data[i] = data[i]
        }



        ctx.putImageData(imageData, 0, 0)


    }, [])

    return (
        <canvas className={classes.Canvas} ref={canvasRef} width={props.width} height={props.height}/>
    )
}

export default Canvas

