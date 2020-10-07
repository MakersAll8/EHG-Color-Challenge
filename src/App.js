import React, {Component} from "react";
import classes from './App.css';
import Canvas from "./components/Canvas/Canvas";

class App extends Component {
    render(){
        return (
            <div className={classes.App}>
                <h1>Color App</h1>
                <Canvas/>
            </div>
        )
    }
}

export default App
