import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/user/user_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var UserLoginLogsTable = React.createClass({
    getInitialState: function () {

        return {
            userEditDialog: {
                echoData: undefined
            },
            userLoginLogsTable: {
                dataSourceUrl: "/user/login/logs",
                editable: false,
                haveSearchUsername: false,
                usernameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                refreshBtnLoading: false,
                data: [],//displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    username: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        }
    },
    onSearchUsername(username)
    {
        this.updateUsernameOfQuery(username);
        if (!isEmptyString(this.state.userLoginLogsTable.query.username)) {
            this.updateHaveSearchUsername(true);
        } else {

            this.updateHaveSearchUsername(false);
        }
        this.loadUserLoginLogsTableData();
    },
    updateHaveSearchUsername(haveSearchUsername)
    {
        var state = this.state;
        state.userLoginLogsTable.haveSearchUsername = haveSearchUsername;
        this.setState(state);
    },
    updateUsernameOfQuery(username)
    {
        var state = this.state;
        state.userLoginLogsTable.query.username = username;
        this.setState(state);
    },
    updateUserLoginLogsTableData(data)
    {
        var state = this.state;
        state.userLoginLogsTable.data = data;
        this.setState(state);
    },
    updateUserLoginLogsTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.userLoginLogsTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateUserLoginLogsTablePage(page)
    {
        var state = this.state;
        state.userLoginLogsTable.page = page;
        this.setState(state);
    },
    updateUserLoginLogsTableQuery(query)
    {
        var state = this.state;
        state.userLoginLogsTable.query = query;
        this.setState(state);
    },
    updateUserLoginLogsTableLoading(flag)
    {
        var state = this.state;
        state.userLoginLogsTable.tableLoading = flag;
        this.setState(state);
    },
    updateUserLoginLogsTableColumns(columns)
    {

        var state = this.state;
        state.userLoginLogsTable.columns = columns;
        this.setState(state);
    },
    updateUserLoginLogsTableOriginalData(originalData){
        var state = this.state;
        state.userLoginLogsTable.originalData = originalData;
        this.setState(state);
    },
    componentDidMount()
    {
        // "id":4,
        //     "status":1,
        //     "createTime":1520845823,
        //     "updateTime":1520845823,
        //     "isDeleted":2,
        //     "userId":41,
        //     "loginIp":"171.221.142.90",
        //     "system":"Windows 7",
        //     "dpi":"1920*1080",
        //     "brower":"chrome 62.0.3202.94",
        //     "country":"中国",
        //     "province":"四川",
        //     "city":"成都",
        //     "loginTime":1520845823,
        //     "result":1
        const {query, haveSearchUsername} = this.state.userLoginLogsTable;
        this.updateUserLoginLogsTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            // {
            //     title: '用户id',
            //     width: 100,
            //     dataIndex: 'user_id',
            //     sorter: true
            // },
            {
                title: '用户名',
                width: 100,
                dataIndex: 'username',
                render: (text, record) => {
                    if(isUndefined(text)){
                        return "未知";
                    }
                    return commons.highLight(text, query.username);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索用户名"
                            onSearch={this.onSearchUsername}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: haveSearchUsername ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.userTable.usernameDropdownVisible,

            },
            {
                title: '登录ip',
                width: 100,
                dataIndex: 'login_ip',
                sorter: true
            },
            {
                title: '操作系统',
                width: 100,
                dataIndex: 'system',
                sorter: true
            },

            {
                title: '分辨率',
                width: 100,
                dataIndex: 'dpi',
                sorter: true
            },

            {
                title: '浏览器',
                width: 100,
                dataIndex: 'brower',
                sorter: true
            },

            {
                title: '国家',
                width: 100,
                dataIndex: 'country',
                sorter: true
            },

            {
                title: '省份',
                width: 100,
                dataIndex: 'province',
                sorter: true
            },

            {
                title: '城市',
                width: 100,
                dataIndex: 'city',
                sorter: true
            },

            {
                title: '登陆时间',
                width: 100,
                dataIndex: 'login_time',
                render: (text) => {
                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: true
            },


        ]);
        this.loadUserLoginLogsTableData();
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.userLoginLogsTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateUserLoginLogsTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadUserLoginLogsTableData();
    },
    userLoginLogsTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: i,
                id: item.id,
                username: item.username,
                create_time: item.createTime,
                update_time: item.updateTime,
                user_id: item.userId,
                login_ip: item.userId,
                system: item.system,
                dpi: item.dpi,
                brower: item.brower,
                country: item.country,
                province: item.province,
                city: item.city,
                login_time: item.loginTime,
                result: item.result,
            });
        }.bind(this));
        return data;
    },
    loadUserLoginLogsTableData()
    {
        this.updateUserLoginLogsTableLoading(true);
        this.updateUserLoginLogsTableRefreshBtnLoading(true);
        const {page, query} = this.state.userLoginLogsTable;
        //filter
        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        ajax.get({
            url: this.state.userLoginLogsTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.userLoginLogsTableDataFiledsConverter(originalData)
                //save data

                this.updateUserLoginLogsTableOriginalData(originalData);

                this.updateUserLoginLogsTableData(data);

                var page = this.state.userLoginLogsTable.page;
                this.updateUserLoginLogsTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            }.bind(this),
            error: function () {

            }.bind(this),
            complete: function () {
                this.updateUserLoginLogsTableLoading(false);
                this.updateUserLoginLogsTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    render: function () {


        var {columns, data, page, tableLoading, refreshBtnLoading, bordered} = this.state.userLoginLogsTable;


        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={this.loadUserLoginLogsTableData}
                    >
                        刷新
                    </Button>
                </div>
                <Table
                    locale={{emptyText: "暂无用户数据"}}
                    columns={columns}
                    dataSource={data}
                    pagination={
                        {
                            total: page.total,
                            showTotal: (total, range) => {
                                return `第 ${range[0]}-${range[1]} 条记录 , 共 ${total} 条记录`;
                            },
                            pageSize: page.size,
                            defaultCurrent: 1
                        }
                    }
                    loading={tableLoading}
                    onChange={this.handleTableChange}
                    bordered={bordered}
                    title={() => '用户登录日志列表'}
                    // footer={() => 'Footer'}
                    scroll={{x: "100%", y: "100%"}}/>


            </div>
        );
    }
});


export default withRouter(UserLoginLogsTable);   //将App组件导出
