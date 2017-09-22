/*module.exports=function () {
    let h1=document.createElement('h1');
    h1.textContent='啦啦啦啊22222';
    return h1;
};*/

import React,{Component} from 'react';
import data from './data.json';
import styles from './index.less';

export default class Greeter extends Component{
    render(){
        return(
            <div className={styles.root}>
                <h1>{data.title}</h1>
                <p>这是副标题11111</p>
            </div>
        )
    }
}