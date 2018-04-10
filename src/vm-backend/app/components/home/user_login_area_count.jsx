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


var UserLoginAreaCount = React.createClass({
    getInitialState: function () {
        return {};
    },

    componentDidMount(){


        c($(this.refs.chartContainer));
        let myChart = echarts.init($(this.refs.chartContainer).get(0));

        myChart.setOption(this.getOption(),true)
    },
    getOption(){

        var option = {
            title: {
                text: '用户登录地点',
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
                data: ['四川', '眉山','未知']
            },
            calculable: true,
            series: [

                {

                    name:'用户登录地点',
                    type:'pie',
                    radius : [20, 110],
                    // center : ['25%', '50%'],
                    roseType : 'area',
                    data: [
                        {value: 1110, name: '四川'},
                        {value: 501, name: '眉山'},
                        {value: 500, name: '未知'}
                    ]
                }
            ]
        };





        return option;
    },
    render: function () {

        return (
            <div ref="chartContainer" style={{width:"100%",height:"300"}}></div>
        );
    }
});

export default (UserLoginAreaCount);   //将App组件导出
