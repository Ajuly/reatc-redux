## redux

    react+redux
    redux 中间件
    redux-logger
    redux-promise
    redux-thunk
    redux-saga
    dva


## 手写 createStore
## 手写 combineReducers

## 多个组件共有的部分，进行封装

## actionCreator

    import * as types from '../action-types';

    // actionCreator 创建action函数
    export default{
        increment(){
            return {type:types.INCREMENT}
        },
        decrement(){
            return {type:types.DECREMENT}
        }
    }
## bindActionCreator 

    用来实现 actionCreator 和 dispatch 的绑定

## 将react与redux进行连接 

    react-redux：connect+Provider 的实现

    
    
