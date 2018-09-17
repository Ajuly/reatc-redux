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
                this.state = (this.store.getState());
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
                if(typeof mapDispatchToProps === 'function'){
                    actions = mapDispatchToProps(this.store.dispatch);
                }else if(typeof mapDispatchToProps === 'object'){
                    actions = bindActionCreators(mapDispatchToProps,this.store.dispatch);
                }
                return <WrappedComponent {...this.state} {...actions} />
            }
        }
        return ProxyComponent;
    }
}
