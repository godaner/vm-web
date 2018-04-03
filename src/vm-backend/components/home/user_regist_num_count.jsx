import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon,Row ,Col} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../../scss/home/home_page.scss';
import "../base/events_dispatcher";
import {Switch, BrowserRouter, HashRouter, Route, Link, withRouter} from 'react-router-dom';
import {ajax, commons} from "../base/vm_util";
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';


var UserRegistNumCount = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){
    },
    getOption(){

        let option = {
            title: {
                text: '用户注册量',
                // subtext: '纯属虚构',
                x: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]

    };









        return option;
    },
    render: function () {
        //set now page's props
        return (
            <ReactEcharts option={this.getOption()}/>
        );
    }
});

export default (UserRegistNumCount);   //将App组件导出
