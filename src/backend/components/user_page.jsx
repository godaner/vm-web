import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import HomePage from "./home_page";
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../scss/user_page.scss';
import "./events_dispatcher";
import {Table, Input, Button} from 'antd';
const Search = Input.Search;
var UserPage = React.createClass({
    getInitialState: function () {
        return {


            userTable: {
                dataSourceUrl: "/user/list",
                haveSearchUsername:false,
                usernameDropdownVisible:false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                selectedRowKeys: [],
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
                data: []
            }
        };
    },
    onSearchUsername (newUsernameQuery) {
        this.updateUserTableUsernameQuery(newUsernameQuery);
        if(!isEmptyString(this.state.userTable.query.usernameQuery)){
            this.updateUserTableHaveSearchUsername(true);
        }else{

            this.updateUserTableHaveSearchUsername(false);
        }
        this.loadUserTableData();
    },
    updateUserTableHaveSearchUsername(haveSearchUsername){
        var state = this.state;
        state.userTable.haveSearchUsername = haveSearchUsername;
        this.setState(state);
    },
    updateUserTableUsernameDropdownVisible(usernameDropdownVisible){
        var state = this.state;
        state.userTable.usernameDropdownVisible = usernameDropdownVisible;
        this.setState(state);
    },
    updateUserTableSelectedRowKeys(selectedRowKeys){
        var state = this.state;
        state.userTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    updateUserTableUsernameQuery(newUsernameQuery){
        var state = this.state;
        state.userTable.query.usernameQuery = newUsernameQuery;
        this.setState(state);
    },
    updateUserTableData(data){
        var state = this.state;
        state.userTable.data = data;
        this.setState(state);
    },
    updateUserTablePage(page){
        var state = this.state;
        state.userTable.page = page;
        this.setState(state);
    },
    updateUserTableQuery(query){
        var state = this.state;
        state.userTable.query = query;
        this.setState(state);
    },
    updateUserTableLoading(flag){
        var state = this.state;
        state.userTable.tableLoading = flag;
        this.setState(state);
    },
    updateUserTableColumns(columns){

        var state = this.state;
        state.userTable.columns = columns;
        this.setState(state);
    },
    componentDidMount(){
        this.updateUserTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: (a, b) => {
                }
            },
            {
                title: '头像',
                width: 100,
                dataIndex: 'imgUrl',
                render: (text) => {
                    const imgUrl = vm_config.http_url_prefix + text;
                    return <img style={{width: 50, height: 50}} src={imgUrl}/>
                }
            },
            {
                title: '用户名',
                width: 100,
                dataIndex: 'username',
                render:(text)=>{

                   return text;
                },
                sorter: (a, b) => {
                },
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索用户名"
                            onSearch={this.onSearchUsername}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: this.state.userTable.haveSearchUsername ? '#108ee9' : '#aaa' }} />,
                // filterDropdownVisible: this.state.userTable.usernameDropdownVisible,

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
                sorter: (a, b) => {
                }


            },
            {
                title: '密码', width: 100,
                dataIndex: 'password',
                sorter: (a, b) => {
                }
            },
            {
                title: '简介', width: 200,
                dataIndex: 'description',
                sorter: (a, b) => {
                }
            },
            {
                title: '生日',
                width: 100,
                dataIndex: 'birthday',
                render: (text) => {
                    return timeFormatter.formatDate(text * 1000);
                },
                sorter: (a, b) => {
                }
            },
            {
                title: '创建时间',
                width: 100,
                dataIndex: 'create_time',
                render: (text) => {
                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: (a, b) => {
                },
                defaultSortOrder: 'descend',
            },
            {
                title: '最后更新时间',
                width: 100,
                dataIndex: 'update_time',
                render: (text) => {

                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: (a, b) => {
                    return a.username.length - b.username.length;
                }
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (text) => {
                    return text == 1 ? "正常" : text == 2 ? "冻结" : text;
                },
                sorter: (a, b) => {
                }
            },


            {
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: () => {
                    return <div>
                        <a onClick={this.editRecord} href="javascript:void(0);">编辑</a>&nbsp;&nbsp;
                        <a onClick={this.deleteRecord} href="javascript:void(0)">删除</a>
                    </div>
                },
            },]);
        this.loadUserTableData();
    },
    handleTableChange(pagination, filters, sorter){
        const page = this.state.userTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = sorter.field;
        var orderType = sorter.order;
        this.updateUserTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadUserTableData();
    },
    loadUserTableData(){
        this.updateUserTableLoading(true);
        const {page, query} = this.state.userTable;
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
            url: this.state.userTable.dataSourceUrl,
            data: $.extend(page, query),
            onResponseSuccess: function (result) {
                const data = [];
                $.each(result.data.list, function (i, item) {

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
                this.updateUserTableData(data);
                var page = this.state.userTable.page;
                this.updateUserTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
                this.updateUserTableLoading(false);
            }.bind(this)
        });
    },
    editRecord(){
        c("editRecord");

    },
    deleteRecord(){
        c("deleteRecord");

    },
    batchDeleteRecord(){
        c("batchDeleteRecord");

    },
    showAddRecordDialog(){
        c("showAddRecordDialog");
    },
    render: function () {

        const {selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, bordered} = this.state.userTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.updateUserTableSelectedRowKeys(selectedRowKeys);
                var selectedRowKeys = this.state.userTable.selectedRowKeys;
                c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

            },
            onSelect: (record, selected, selectedRows) => {
                // c(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // c(selected, selectedRows, changeRows);
            },
        };
        const hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        type="primary"
                        onClick={this.showAddRecordDialog}
                    >
                        添加
                    </Button>
                    <Button
                        style={{marginLeft:8}}
                        type="danger"
                        onClick={this.batchDeleteRecord}
                        disabled={!hasSelected}
                        loading={batchDeleteBtnLoading}
                    >
                        批量删除
                    </Button>

                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `选择了 ${selectedRowKeys.length} 个选项` : ''}
                    </span>
                </div>
                <Table columns={columns}
                       rowSelection={rowSelection}
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
                       title={() => '用户列表'}
                    // footer={() => 'Footer'}
                       scroll={{x: "100%", y: "100%"}}/>
            </div>
        );
    }
});

export default UserPage;   //将App组件导出
