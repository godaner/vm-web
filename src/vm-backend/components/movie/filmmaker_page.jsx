import React from "react";
import {Input, Layout, Menu, Select} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/movie_page.scss";
import "../base/events_dispatcher";
import FilmmakerTable from "./filmmaker_table";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var FilmmakerPage = React.createClass({
    getInitialState: function () {

        return {}
    },

    render: function () {

        return (
            <div>

                <FilmmakerTable/>
            </div>
        );
    }
});


export default withRouter(FilmmakerPage);   //将App组件导出
