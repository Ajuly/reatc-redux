let appState = {
    title: {
        color: 'red',
        text: '标题'
    },
    content: {
        color: 'green',
        text: '内容'
    }
};

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

function renderApp(appState){
    renderTitle(appState.title);
    renderContent(appState.content);
}

const UPDATE_TITLE_COLOR = "UPDATE_TITLE_COLOR";
const UPDATE_TITLE_TEXT = "UPDATE_TITLE_TEXT";
const UPDATE_CONTENT_COLOR = "UPDATE_CONTENT_COLOR";
const UPDATE_CONTENT_TEXT = "UPDATE_CONTENT_TEXT";

// 派发分发
// action 动作 描述下动作的内容 普通的js对象，只有type属性是必须的，其他的随意
function dispatch(action){ // {type:"UPDATE_TITLE_COLOR",color:'purple'}
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            appState.title.color = action.color;
            break;
        case UPDATE_TITLE_TEXT:
            appState.title.text = action.text;
            break;
        case UPDATE_CONTENT_COLOR:
            appState.content.color = action.color;
            break;
        case UPDATE_CONTENT_TEXT:
            appState.content.text = action.text;
            break;
        default:
            throw new Error('指令无法识别');
    }

}

renderApp(appState);

setTimeout(() => {
    dispatch({type:"UPDATE_TITLE_COLOR",color:"pink"});
    dispatch({type:"UPDATE_CONTENT_TEXT",text:"新内容"});
    renderApp(appState);
}, 1000);

/**
 * 这样存在的问题：
 * 存在问题一：全局变量可被任意的修改，不安全
 * 解决：增加修改的门槛，不能直接操作
 *      dispatch
 * 存在问题二：
 *      将 appState 保护起来
 * 
 */