import React,{Component} from 'react';
import data from './data.json';
//导入你自己的css
import styles from './index.less';
class Greeter extends Component{
    render(){
        return(
            <div className={styles.root}>
                <h1>{data.Greeter}</h1>
                <h3>我是副标题1</h3>
            </div>
        )
    }
}
export default Greeter;