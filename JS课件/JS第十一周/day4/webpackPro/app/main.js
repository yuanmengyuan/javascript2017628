import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import Header from './Header';
import styles from './main.less';
class Page extends React.Component{
    render(){
        return(
            <div className={styles.root}>
                <Header/>
                <Greeter/>
            </div>
        )
    }
}
//自定义标签用大些； 系统标签用小写 html h1 h2 div
render(<Page/>,document.querySelector('#root'));