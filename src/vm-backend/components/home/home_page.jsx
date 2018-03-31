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


var HomePage = React.createClass({
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
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    // center: ['75%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 10, name: '男'},
                        {value: 5, name: '女'},
                        {value: 5, name: '未知'}
                    ]
                }
            ]
        };


        return option;
    },
    render: function () {
        //set now page's props
        return (
            <div>
                <Row justify="center" align="middle">
                    <Col span={6}>
                        <ReactEcharts option={this.getOption()}/>
                    </Col>
                </Row>

            </div>
        );
    }
});

export default withRouter(HomePage);   //将App组件导出
