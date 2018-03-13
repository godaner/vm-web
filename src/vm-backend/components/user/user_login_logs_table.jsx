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
                dataSourceUrl: "/user/login/logs/list",
                editable: false,
                haveSearchUserLoginLogsname: false,
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
                    usernameQuery: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        }
    },
    onSearchUserLoginLogsname(newUserLoginLogsnameQuery)
    {
        this.updateUserLoginLogsTableUserLoginLogsnameQuery(newUserLoginLogsnameQuery);
        if (!isEmptyString(this.state.userLoginLogsTable.query.usernameQuery)) {
            this.updateUserLoginLogsTableHaveSearchUserLoginLogsname(true);
        } else {

            this.updateUserLoginLogsTableHaveSearchUserLoginLogsname(false);
        }
        this.loadUserLoginLogsTableData();
    },
    updateUserLoginLogsTableHaveSearchUserLoginLogsname(haveSearchUserLoginLogsname)
    {
        var state = this.state;
        state.userLoginLogsTable.haveSearchUserLoginLogsname = haveSearchUserLoginLogsname;
        this.setState(state);
    },
    updateUserLoginLogsTableUserLoginLogsnameQuery(newUserLoginLogsnameQuery)
    {
        var state = this.state;
        state.userLoginLogsTable.query.usernameQuery = newUserLoginLogsnameQuery;
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

        this.updateUserLoginLogsTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '头像',
                width: 100,
                dataIndex: 'imgUrl',
                render: (text, record) => {
                    const imageUrl = commons.addUrlParam({
                        url: vm_config.http_url_prefix + text,
                        obj: {
                            width: "50"
                        }
                    });


                    return <img onClick={() => this.showUserLoginLogsImgUploaderDialog(record)} style={{
                        width: 50,
                        height: 50,
                        cursor: "pointer"
                    }} src={imageUrl} alt=""/>

                }
            },
            {
                title: '用户名',
                width: 150,
                dataIndex: 'username',
                render: (text, record) => {
                    return commons.highLight(text, this.state.userLoginLogsTable.query.usernameQuery);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索用户名"
                            onSearch={this.onSearchUserLoginLogsname}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: this.state.userLoginLogsTable.haveSearchUserLoginLogsname ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.userLoginLogsTable.usernameDropdownVisible,

            },


            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                render: (text) => {
                    var res = text;
                    if (text == 1) {
                        res = "男";
                    }
                    if (text == 2) {
                        res = "女";
                    }
                    if (text == 3) {
                        res = "未知";
                    }
                    return res;
                },
                sorter: true


            },
            {
                title: '密码', width: 100,
                dataIndex: 'password',
                sorter: true
            },
            {
                title: '简介', width: 200,
                dataIndex: 'description',
                render: (text) => {
                    return commons.makeTipSpan(text, 33);
                },
                sorter: true
            },
            {
                title: '生日',
                width: 100,
                dataIndex: 'birthday',
                render: (text) => {
                    return timeFormatter.formatDate(text * 1000);
                },
                sorter: true
            },
            {
                title: '创建时间',
                width: 150,
                dataIndex: 'create_time',
                render: (text) => {
                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: true
            },
            {
                title: '最后更新时间',
                width: 150,
                dataIndex: 'update_time',
                render: (text) => {
                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: true
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (text) => {
                    return text == 1 ? "正常" : text == 2 ? "冻结" : text;
                },
                sorter: true
            }


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
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                username: item.username,
                sex: item.sex,
                password: item.password,
                description: item.description,
                birthday: item.birthday,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status,
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


        var { columns, data, page, tableLoading, refreshBtnLoading, bordered} = this.state.userLoginLogsTable;


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
