import React, { Component } from "react";
import actions from "../store/actions/todos";
import { connect } from "../react-redux";


class Todos extends Component {
  handleKeyDown = event => {
    let code = event.keyCode;
    if (code === 13) {
      this.props.addTodo(event.target.value);
      event.target.value = "";
    }
  };
  render() {
    return (
      <div style={{ border: "1px solid #ddd" }}>
        <input onKeyDown={this.handleKeyDown} />
        <ul>
          {
            this.props.items && this.props.items.map((item, index) => (
              <li key={index} style={{textDecoration:item.completed?'line-through':''}}>
              <span onDoubleClick={()=>this.props.toggleTodo(index)}>{index}</span>
              <button onClick={()=>this.props.delTodo(index)}>删除</button>
              </li>
            ))
          }
        </ul>
        <button onClick={() =>this.props.switchType("all")} style={{color:this.props.newtype === 'all'?'red':'black'}}>全部</button>
        <button onClick={() =>this.props.switchType("completed")} style={{color:this.props.newtype === 'completed'?'red':'black'}}>未完成</button>
        <button onClick={() =>this.props.switchType("uncompleted")} style={{color:this.props.newtype === 'uncompleted'?'red':'black'}}>已完成</button>
      </div>
    );
  }
}

export default connect(
  // state => state.todos,
  state =>(
    {...state.todos,items:state.todos.items.filter(item =>{
      if(state.todos.newtype === 'completed'){
        return item.completed;
      }else if(state.todos.newtype === 'uncompleted'){
        return !item.completed;
      }else{
        return item;
      }
    })}
  ),
  actions)(Todos);


/**
 * 数据处理可以放在map前也可以放在connect时进行处理
 */