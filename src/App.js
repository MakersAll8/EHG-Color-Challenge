import React, {Component, useRef} from "react";
import classes from './App.css';
import Canvas from "./components/Canvas/Canvas";

class App extends Component {


    render(){
        return (
            <div className={classes.App}>
                <p>Color App</p>
                <Canvas/>
            </div>
        )
    }
}

export default App
