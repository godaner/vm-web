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

    componentDidMount(){

        this.loadData();

        this.registEvents();

    },
    registEvents(){
        const {tagGroupId} = this.props;
        window.eventEmitter.on('onTagAddSuccess', (record) => {

            if (record.tagGroupId == tagGroupId) {
                debugger
                this.loadData();
            }

        });
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
    loadData(){
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


        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: 100
            },
            {
                title: '标签名称',
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
                render: () => {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <a onClick={() => this.showEditDialog(record)} href="javascript:void(0);">编辑</a>
                            </Menu.Item>
                            <Menu.Item>
                                <Popconfirm title="确认删除 ? "
                                            okText="删除"
                                            cancelText="取消"
                                            onConfirm={() => this.deleteRecord([record.id])}>
                                    <a href="javascript:void(0)">删除</a>
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <span className="table-operation">

                        <Dropdown overlay={menu}>
                          <a href="javascript:void(0);">
                            操作 <Icon type="down"/>
                          </a>
                        </Dropdown>
                    </span>
                    );
                },
            },
        ];
        this.updateTableColumns(columns);
    },

    render: function () {


        const {bordered, columns, data, tableLoading} = this.state.tagTable;
        return (
            <div>

                <Table
                    className="components-table-demo-nested"
                    bordered={bordered}
                    loading={tableLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />


            </div>
        );
    }
});


export default TagTable;   //将App组件导出
