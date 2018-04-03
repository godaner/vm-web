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


var MovieClsCount = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){
    },
    getOption(){
        var option = {
            title: {
                text: '电影类型分布',
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
                data: ['惊悚', '恐怖','喜剧']
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
                        {value: 112130, name: '惊悚'},
                        {value: 212313, name: '恐怖'},
                        {value: 10311, name: '喜剧'}
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

export default (MovieClsCount);   //将App组件导出
