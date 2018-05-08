import React, { Component } from 'react'
import store from '../store'
import actions from '../store/actions/counter'
import {bindActionCreators} from '../redux'
let newActions = bindActionCreators(actions,store.dispatch);



export default class Counter extends Component {
  constructor() {
      super();
      this.state = {number:store.getState().counter.number};
  }

  componentWillMount = () => {
    this.unsubscribe = store.subscribe(()=>{
        this.setState({number:store.getState().counter.number});
    });
  }

  componentWillUnmount() {
      this.unsubscribe();// 取消订阅
  }
  
  render() {
    return (
      <div style={{border:'1px solid #ddd'}}>
        <p>{this.state.number}</p>
        <button onClick={newActions.increment}>+</button>
        <button onClick={newActions.decrement}>-</button>
        <button onClick={()=>{
            setTimeout(() => {
                newActions.increment()
            }, 1000);
        }}>过一秒之后再加</button>
      </div>
    )
  }
}
