import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Row, Col} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../../../scss/home/home_page.scss';
import "../base/events_dispatcher";
import {Switch, BrowserRouter, HashRouter, Route, Link, withRouter} from 'react-router-dom';
import {ajax, commons} from "../base/vm_util";
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import SexCount from "./sex_count";
import MovieClsCount from "./movie_cls_count";
import UserRegistNumCount from "./user_regist_num_count";


var HomePage = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){
    },
    render: function () {
        //set now page's props
        return (
            <div>
                <Row justify="center" align="middle">

                    <Col span={6}>
                        <SexCount/>
                    </Col>
                    <Col span={6}>
                        <MovieClsCount/>
                    </Col>
                    <Col span={12}>
                        <UserRegistNumCount/>
                    </Col>
                </Row>

            </div>
        );
    }
});

export default withRouter(HomePage);   //将App组件导出
