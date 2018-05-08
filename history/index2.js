

function renderTitle(title) {
    let element = document.querySelector('#title');
    element.innerHTML = title.text;
    element.style.color = title.color;
}

function renderContent(content) {
    let element = document.querySelector('#content');
    element.innerHTML = content.text;
    element.style.color = content.color;
}



const UPDATE_TITLE_COLOR = "UPDATE_TITLE_COLOR";
const UPDATE_TITLE_TEXT = "UPDATE_TITLE_TEXT";
const UPDATE_CONTENT_COLOR = "UPDATE_CONTENT_COLOR";
const UPDATE_CONTENT_TEXT = "UPDATE_CONTENT_TEXT";

// 定义一个方法，创建一个仓库，仓库其实是一个对象，只不过可以引用闭包变量
function createStore(reducer){
    let appState;
    let listeners = [];
    function getState(){
        // 深拷贝
        return JSON.parse(JSON.stringify(appState));
    }
    // 派发分发
    // action 动作 描述下动作的内容 普通的js对象，只有type属性是必须的，其他的随意
    function dispatch(action){ // {type:"UPDATE_TITLE_COLOR",color:'purple'}
        // 接收新的动作后，通过老状态新动作计算出新状态
        appState = reducer(appState,action);
        // 然后通知所有的监听函数执行
        listeners.forEach(listener => listener());
    }
    // 派发一个动作获取初始值
    dispatch({});
    // 订阅，供外界订阅本仓库中状态的变化，如果状态变化了，会执行订阅的逻辑
    function subscribe(listener){
        listeners.push(listener);
        // 返回一个取消订阅函数
        return function(){
            listeners = listeners.filter(item => item != listener)
        }

    }
    return{
        getState,
        dispatch,
        subscribe
    }

}
// 初始的状态
let initState = {
    title: {
        color: 'red',
        text: '标题'
    },
    content: {
        color: 'green',
        text: '内容'
    }
};
// reducer 处理器 根据老的状态和拿到的动作，返回新的状态   
let reducer = function(appState = initState ,action){
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            return { ...appState,title:{...appState.title,color:action.color}}; // 解构老的然后拿新的进行覆盖
        case UPDATE_TITLE_TEXT:
            return { ...appState,title:{...appState.title,text:action.text}};
        case UPDATE_CONTENT_COLOR:
            return { ...appState,content:{...appState.content,color:action.color}};
        case UPDATE_CONTENT_TEXT:
            return { ...appState,content:{...appState.content,text:action.text}};
        default:
            return appState;
    }
};

let store = createStore(reducer);
function render(){
    renderTitle(store.getState().title);
    renderContent(store.getState().content);
}
render();

// 订阅
let unsubscribe = store.subscribe(render);

setTimeout(() => {
    store.dispatch({type:"UPDATE_TITLE_COLOR",color:"pink"});
    // unsubscribe();
    store.dispatch({type:"UPDATE_CONTENT_TEXT",text:"新内容"});
}, 1000);

/**
 * 这样存在的问题：
 * 存在问题一：全局变量可被任意的修改，不安全
 * 解决：增加修改的门槛，不能直接操作
 *      dispatch
 * 存在问题二：
 *      将 appState 保护起来   createStore
 * 1.
 * 2.增加了修改的门槛
 * 3.
 * 4.
 * 5.怎样重新渲染呢？ 监听订阅发布
 */