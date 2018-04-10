import React from "react";
import {Layout, Menu} from "antd";
import {EventEmitter} from "events";
//import "antd/dist/antd.css";
import "../../scss/home/home_page.scss";
import "../base/events_dispatcher";
import {BrowserRouter, HashRouter, Link, Route, Switch, withRouter} from "react-router-dom";
import {ajax, commons} from "../base/vm_util";
import echarts from "echarts";
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
// import ReactEcharts from 'echarts-for-react';


var UserSexCount = React.createClass({
    getInitialState: function () {
        return {
            url: "/user/count/sex"
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
        let sexCodes = commons.getFieldListByKey(result.data.list, "sex");

        let sexStrs = [];

        $.each(sexCodes, function (i, item) {
            sexStrs.push(commons.getSexStrByIndex({
                index: item
            }));
        });
        //data
        var data = [];
        $.each(result.data.list, function (i, item) {

            let str = commons.getSexStrByIndex({
                index: item.sex
            });
            data.push({
                value: item.number, name: str
            });
        });
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
                data: sexStrs
            },
            calculable: true,
            series: [

                {

                    name: '用户性别分布',
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

export default (UserSexCount);   //将App组件导出
