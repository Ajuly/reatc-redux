// import React,{Component} from 'react';
// import PropTypes from 'prop-types';
// import {bindActionCreator} from '../redux';

// export default function (mapStateToProps,mapDispatchToProps) {
//     return function (Component) {
//         class WrappedComponent extends Component{
//             static contextTypes={
//                 store:PropTypes.object.isRequired
//             }
//             constructor(props,context) {
//                 super(props);
//                 this.store=context.store;
//                 this.state=mapStateToProps(this.store.getState());
//             }
//             componentDidMount() {
//                 this.unsubscribe = this.store.subscribe(() => {
//                     this.setState(mapStateToProps(this.store.getState()));
//                 });
//             }
//             componentWillUnmount() {
//                 this.unsubscribe();
//             }
//             render() {
//                 let actions={};
//                 if (typeof mapDispatchToProps == 'object') {
//                     actions=bindActionCreator(mapDispatchToProps,this.store.dispatch);
//                 } else {
//                     actions=mapDispatchToProps(this.store.dispatch);
//                 }
//                 return <Component {...this.state}  {...actions}/>
//             }
//         }
//         return WrappedComponent;
//     }
// }

import React,{Component} from 'react';
import propTypes from 'prop-types';
import {bindActionCreators} from '../redux';

export default function(mapStateToProps,mapDispatchToProps){
    return function(WrappedComponent){
        class ProxyComponent extends Component{
            static contextTypes = {
                store:propTypes.object
            }
            constructor(props,context){
                super(props,context);
                this.store = context.store;
                // 进行映射
                this.state = mapStateToProps(this.store.getState());
            }
            componentWillMount = () => {
              this.unsubscribe = this.store.subscribe(()=>{
                  this.setState(mapStateToProps(this.store.getState()));
              })
            }

            componentWillUnmount() {
                this.unsubscribe(); 
            }
            
            render(){
                let actions = {};
                if(typeof mapDispatchToProps == 'function'){
                    actions = mapDispatchToProps(this.store.dispatch);
                }else if(typeof mapDispatchToProps == 'object'){
                    actions = bindActionCreators(mapDispatchToProps,this.store.dispatch);
                }
                return <WrappedComponent {...this.state} {...actions} />
            }
        }
        return ProxyComponent;
    }
}