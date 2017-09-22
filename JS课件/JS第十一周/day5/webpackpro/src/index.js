import React,{Component} from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import Yuqing from './Yuqing';

class Index extends Component{
    render(){
        return(
            <div>
                <Greeter/>
                <Yuqing></Yuqing>
            </div>
        )
    }
}
render(<Index/>,document.querySelector('#root'));

