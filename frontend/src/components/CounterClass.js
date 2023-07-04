import React from 'react';

class CounterClass extends React.Component{
    constructor(){
        super();//all are passing to the super component
        this.increment=this.increment.bind(this)
        this.state={//state is a js object in react
            number: 0
        }
    }
increment(){
    this.setState({
        // eslint-disable-next-line
        number: ++ this.state.number
    })
}

    render(){
        return(
            <div>
                <h1>Counter = {this.state.number}</h1>
                <button onClick={this.increment}>Increment</button>

            </div>
        )
    }
}

export default CounterClass;