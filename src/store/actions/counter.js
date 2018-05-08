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