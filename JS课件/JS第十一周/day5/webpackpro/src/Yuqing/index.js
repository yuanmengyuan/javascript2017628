import React,{Component} from 'react';
import data from './data.json';
import styles from './index.less';

export default class Yuqing extends Component{
    render(){
        return(
            <div className={styles.root}>
                <h1>{data.title}</h1>
                <p>{data.title2}</p>
            </div>
        )
    }
}
