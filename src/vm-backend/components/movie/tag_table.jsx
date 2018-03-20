import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Dropdown, Badge} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/tag_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";

const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var TagTable = React.createClass({
    getInitialState: function () {

        return {


            tagTable: {
                dataSourceUrl: "/tag/info/",
                bordered: false,
                tableLoading: false,
                columns: [],
                data: []

            }
        }
    },
    updateTableLoading(loading){
        var state = this.state;
        state.tagTable.tableLoading = loading;
        this.setState(state);
    },
    updateTableColumns(columns){
        var state = this.state;
        state.tagTable.columns = columns;
        this.setState(state);
    },

    updateTableData(data){
        var state = this.state;
        state.tagTable.data = data;
        this.setState(state);
    },
    dataConverter(dataArr){
        const data = [];
        for (let i = 0; i < dataArr.length; ++i) {
            const d = dataArr[i];
            data.push({
                key: i,
                id: d.id,
                name: d.name,
                status: d.status,
                create_time: d.createTime,
                update_time: d.updateTime
            });
        }
        return data;
    },
    componentDidMount(){
        this.updateTableLoading(true);
        const {dataSourceUrl} = this.state.tagTable;
        const {tagGroupId} = this.props;
        ajax.get({
            url: dataSourceUrl + tagGroupId,
            success: function (result) {
                const tags = result.data.list;

                const data = this.dataConverter(tags);

                this.updateTableData(data);
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            }.bind(this),
            error: function () {

            }.bind(this),
            complete: function () {
                this.updateTableLoading(false);
            }.bind(this)
        });


        const menu = (
            <Menu>
                <Menu.Item>
                    Action 1
                </Menu.Item>
                <Menu.Item>
                    Action 2
                </Menu.Item>
            </Menu>
        );
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: 100
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render: function (text) {
                    return commons.getStatusStrByIndex({index: text});
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                width: 100,
                render: function (text) {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                }
            },
            {
                title: '创建时间',
                dataIndex: 'update_time',
                key: 'update_time',
                width: 100,
                render: function (text) {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 100,
                render: () => (
                    <span className="table-operation">
                        <a href="#">Pause</a>
                        <a href="#">Stop</a>
                        <Dropdown overlay={menu}>
                          <a href="#">
                            More <Icon type="down"/>
                          </a>
                        </Dropdown>
                    </span>
                ),
            },
        ];
        this.updateTableColumns(columns);


    },
    render: function () {


        const {bordered, columns, data} = this.state.tagTable;
        return (
            <Table
                className="components-table-demo-nested"
                bordered={bordered}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    }
});


export default TagTable;   //将App组件导出
