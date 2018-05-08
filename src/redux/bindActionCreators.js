// bindActionCreator 用来实现 actionCreator 和 dispatch 的绑定

export default function bindActionCreators(actions,dispatch) {
    let newActions={};
    for (let key in actions) {
        newActions[key]=() => dispatch(actions[key].apply(null,arguments));
    }
    return newActions;
}


// function bindActionCreators(actions,dispatch){
//     let newActions = {};
//     for(let attr in actions){
//         newActions[attr] = function(){
//             dispatch(actions[attr].apply(null, arguments));
//         }
//     }
//     return newActions;
// }