import * as types from '../action-types';

export default{
    addTodo(text){
        return {type:types.ADD_TOTO,text}
    },
    delTodo(index){
        console.log(index);
        return {type:types.DEL_TODO,index}
    },
    toggleTodo(index){
        return {type:types.TOGGLE_TODO,index}
    },
    switchType(newtype){
        return {type:types.SWITCH_TYPE,newtype}
    }
}