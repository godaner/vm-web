import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon,Row ,Col} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {EventEmitter} from 'events';
//import "antd/dist/antd.css";
import '../../scss/home/home_page.scss';
import "../base/events_dispatcher";
import {Switch, BrowserRouter, HashRouter, Route, Link, withRouter} from 'react-router-dom';
import {ajax, commons} from "../base/vm_util";
import echarts from 'echarts';
// import ReactEcharts from 'echarts-for-react';


var UserRegistNumCount = React.createClass({
    getInitialState: function () {
        return {};
    },

    componentDidMount(){


        c($(this.refs.chartContainer));
        let myChart = echarts.init($(this.refs.chartContainer).get(0));

        myChart.setOption(this.getOption(),true)
    },
    getOption(){

        let option = {
            title: {
                text: '用户注册量',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]

    };







        return option;
    },
    render: function () {

        return (
            <div ref="chartContainer" style={{width:"100%",height:"400"}}></div>
        );
    }
});

export default (UserRegistNumCount);   //将App组件导出
