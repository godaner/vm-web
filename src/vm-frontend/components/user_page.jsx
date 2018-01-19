import React from "react"; //引入react组件
import {HashRouter, NavLink, Route, Switch, withRouter} from "react-router-dom";
import PlainPanelTitle from "./plain_panel_title";
import UserBasicInfoPage from "./user_basic_info_page";
import UserHeadPage from "./user_head_page";

import "../scss/user_page.scss";
/*用户个人中心*/
var UserPage = React.createClass({
        getInitialState: function () {
            return {

                basicInfoUrl: "/user/online/basicInfo",
                headUrl: "/user/online/head"
                // userId: this.props.match.params.userId
            };
        },
        componentDidMount(){
        },
        render: function () {
            //是否为非法进入,即用户未登录的情况下进入
            window.VmFrontendEventsDispatcher.getAndCheckOnlineUser();

            return (
                <div id="user_info" className="defaultPanel">
                    <PlainPanelTitle title={this.state.title}/>
                        <div id="content"
                             className="clearfix">
                            <div id="nav">
                                <ul id="nav_ul">

                                    <li>
                                        <NavLink to={this.state.basicInfoUrl}
                                                 activeClassName="active">
                                            基本信息
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={this.state.headUrl}
                                                 activeClassName="active">
                                            头像修改
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div id="displayer">
                                <Switch>
                                    <Route exact path={this.state.basicInfoUrl} component={UserBasicInfoPage}/>
                                    <Route exact path={this.state.headUrl} component={UserHeadPage}/>
                                </Switch>
                            </div>
                        </div>
                </div>
            );
        }
    })
;
export default withRouter(UserPage);