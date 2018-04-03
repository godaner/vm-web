import React from "react";
import {Input, Layout, Menu, Select} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../../scss/user/user_page.scss";
import "../base/events_dispatcher";
import UserTable from "./user_table";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var UserPage = React.createClass({
    getInitialState: function () {

        return {}
    },

    render: function () {

        return (
            <div>

                <UserTable/>
            </div>
        );
    }
});


export default withRouter(UserPage);   //将App组件导出
