import React from "react";
import {Input, Layout, Menu, Select} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/admin/admin_page.scss";
import "../base/events_dispatcher";
import AdminTable from "./admin_table";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var AdminPage = React.createClass({
    getInitialState: function () {

        return {}
    },

    render: function () {

        return (
            <div>

                <AdminTable/>
            </div>
        );
    }
});


export default withRouter(AdminPage);   //将App组件导出
