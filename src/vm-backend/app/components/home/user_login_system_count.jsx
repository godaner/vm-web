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


var UserLoginSystemCount = React.createClass({
    getInitialState: function () {
        return {
            url: "/user/count/login_system"
        };
    },

    componentDidMount(){

        this.loadData();
    },
    initEcharts(option){
        let myChart = echarts.init($(this.refs.chartContainer).get(0));

        myChart.setOption(option, true)
    },
    loadData(){
        const {url} = this.state;
        //ajax
        ajax.get({
            url: url,
            ignoreAjaxError:true,
            success: function (result) {
                let option = this.getOption(result);
                this.initEcharts(option);

            }.bind(this),
            failure: function (result) {
            }.bind(this),
            error: function () {
            }.bind(this),
            complete: function () {
            }.bind(this)
        });
    },
    getOption(result){

        //sexStrs
        let codes = commons.getFieldListByKey(result.data.list, "area");


        //data
        var data = [];
        $.each(result.data.list, function (i, item) {


            data.push({
                value: item.number, name: item.system
            });
        });
        var option = {
            title: {
                text: '用户登录系统分布',
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
                data: codes
            },
            calculable: true,
            series: [

                {

                    name: '用户登录系统分布',
                    type: 'pie',
                    radius: [20, 110],
                    // center : ['25%', '50%'],
                    roseType: 'area',
                    data: data
                }
            ]
        };


        return option;
    },
    render: function () {

        return (
            <div ref="chartContainer" style={{width: "100%", height: "300"}}></div>
        );
    }
});

export default (UserLoginSystemCount);   //将App组件导出
