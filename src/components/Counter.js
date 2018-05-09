import React, { Component } from 'react'
import store from '../store'
import actions from '../store/actions/counter'
import {connect} from '../react-redux'
// import {bindActionCreators} from '../redux'
// let newActions = bindActionCreators(actions,store.dispatch);



class Counter extends Component {
  constructor() {
      super();
      this.state = {number:store.getState().counter.number};
  }

  componentWillMount = () => {
    this.unsubscribe = store.subscribe(()=>{
        // this.setState({number:store.getState().counter.number});
        this.setState({number:this.props.number});
    });
  }

  componentWillUnmount() {
      this.unsubscribe();// 取消订阅
  }
  
  render() {
    return (
      <div style={{border:'1px solid #ddd'}}>
        <p>{this.state.number}</p>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
        <button onClick={()=>{
            setTimeout(() => {
                this.props.increment()
            }, 1000);
        }}>过一秒之后再加</button>
      </div>
    )
  }
}

// connect是一个高阶组件函数
// 把仓库中的状态树映射为当前组件的属性对象
// 负责输入，就是把仓库中的状态输入到组件
// let mapStateToProps = state => state.counter;
// 把store的dispatch方法转换成一个当前组件的属性对象
// 输出  把用户组件中的操作发射出去
// 1.写法： 
// let mapDispatchToProps = dispatch = ({
//     increment:()=>dispatch(action.increment）
// });

// 2.直接把actionCreator放在这
// let mapDispatchToProps = actions;

export default connect(
    state => state.counter,
    actions
)(Counter);


// connect : state + action/dispatch