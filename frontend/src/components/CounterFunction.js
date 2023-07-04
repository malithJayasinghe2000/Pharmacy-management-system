import React,{useState} from "react";

function CounterFunction(){
    let [number,setNumber]= useState(0)

    function increment(){
        setNumber(++number)
    }

    return(
        <div>
            <h3>Functionial component</h3>
            <h1>Counter = {number}</h1>
            <button onClick={e => increment()}>increment</button>
        </div>
    )


}

export default CounterFunction;