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
// import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';


var SexCount = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){
    },
    getOption(){
        var option = {
            title: {
                text: '用户性别分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['男', '女','未知']
            },
            calculable: true,
            series: [

                {

                    name:'半径模式',
                    type:'pie',
                    radius : [20, 110],
                    // center : ['25%', '50%'],
                    roseType : 'radius',
                    data: [
                        {value: 1110, name: '男'},
                        {value: 501, name: '女'},
                        {value: 500, name: '未知'}
                    ]
                }
            ]
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

export default (SexCount);   //将App组件导出
