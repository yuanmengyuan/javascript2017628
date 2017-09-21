import React from 'react';
import data from './index.json';
import styles from './index.less';
export default class Header extends React.Component{
    render(){
        return (
            <div className={styles.root}>
                <h1>{data.title}</h1>
                <p>这是头部的小标题：1111111</p>
            </div>
        )
    }
}
/*
export default Header;*/
