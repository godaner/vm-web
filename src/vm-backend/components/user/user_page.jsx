import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
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
import UserEditDialog from "./user_edit_dialog";
import UserAddDialog from "./user_add_dialog";
import UserImgUploaderDialog from "./user_img_uploader_dialog";
var UserPage = React.createClass({
    getInitialState: function () {

        return {
            userEditDialog: {
                echoData: undefined
            },
            userTable: {
                dataSourceUrl: "/user/list",
                editable: false,
                haveSearchUsername: false,
                usernameDropdownVisible: false,
                bordered: true,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                selectedRowKeys: [],
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
            }
        }
    },
    onSearchUsername(newUsernameQuery)
    {
        this.updateUserTableUsernameQuery(newUsernameQuery);
        if (!isEmptyString(this.state.userTable.query.usernameQuery)) {
            this.updateUserTableHaveSearchUsername(true);
        } else {

            this.updateUserTableHaveSearchUsername(false);
        }
        this.loadUserTableData();
    },
    updateUserTableHaveSearchUsername(haveSearchUsername)
    {
        var state = this.state;
        state.userTable.haveSearchUsername = haveSearchUsername;
        this.setState(state);
    },
    updateUserTableUsernameDropdownVisible(usernameDropdownVisible)
    {
        var state = this.state;
        state.userTable.usernameDropdownVisible = usernameDropdownVisible;
        this.setState(state);
    },
    updateUserTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.userTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    updateUserTableUsernameQuery(newUsernameQuery)
    {
        var state = this.state;
        state.userTable.query.usernameQuery = newUsernameQuery;
        this.setState(state);
    },
    updateUserTableData(data)
    {
        var state = this.state;
        state.userTable.data = data;
        this.setState(state);
    },
    updateUserTablePage(page)
    {
        var state = this.state;
        state.userTable.page = page;
        this.setState(state);
    },
    updateUserTableQuery(query)
    {
        var state = this.state;
        state.userTable.query = query;
        this.setState(state);
    },
    updateUserTableLoading(flag)
    {
        var state = this.state;
        state.userTable.tableLoading = flag;
        this.setState(state);
    },
    updateUserTableColumns(columns)
    {

        var state = this.state;
        state.userTable.columns = columns;
        this.setState(state);
    },
    updateUserTableOriginalData(originalData){
        var state = this.state;
        state.userTable.originalData = originalData;
        this.setState(state);
    },
    updateUserEditDialogEchoData(echoData){
        var state = this.state;
        state.userEditDialog.echoData = echoData;
        this.setState(state);
    },
    showUserImgUploaderDialog(record){
        this.refs.user_img_uploader_dialog.showDialog(record);
    },
    componentDidMount()
    {

        this.updateUserTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '头像',
                width: 80,
                dataIndex: 'imgUrl',
                render: (text,record) => {
                    const imageUrl = vm_config.http_url_prefix + text;


                    return <img onClick={()=>this.showUserImgUploaderDialog(record)} style={{
                        width: "100%",
                        cursor: "pointer"
                    }} src={imageUrl} alt=""/>

                }
            },
            {
                title: '用户名',
                width: 150,
                dataIndex: 'username',
                render: (text, record) => {
                    return commons.highLight(text, this.state.userTable.query.usernameQuery);
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
                                  style={{color: this.state.userTable.haveSearchUsername ? '#108ee9' : '#aaa'}}/>,
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
            },


            {
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: (text, record) => {
                    return <div>
                        <a onClick={() => this.showEditDialog(record)} href="javascript:void(0);">编辑</a>&nbsp;&nbsp;
                        <a onClick={this.deleteRecord} href="javascript:void(0)">删除</a>
                    </div>
                },
                sorter: true
            },]);
        this.loadUserTableData();
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.userTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateUserTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadUserTableData();
    },
    userTableDataFiledsConverter(originalData){
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
    loadUserTableData()
    {
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
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.userTableDataFiledsConverter(originalData)
                //save data

                this.updateUserTableOriginalData(originalData);

                this.updateUserTableData(data);

                var page = this.state.userTable.page;
                this.updateUserTablePage({
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
                this.updateUserTableLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.userTable.originalData, "id", record.id);
        c(record);
        this.updateUserEditDialogEchoData(record)

        this.getUserEditDialog().showDialog();

    },
    deleteRecord()
    {
        c("deleteRecord");

    },
    batchDeleteRecord()
    {
        c("batchDeleteRecord");

    },
    showAddDialog()
    {
        c("showAddDialog");
        this.getUserAddDialog().showDialog();
    },
    getUserAddDialog()
    {
        return this.refs.user_add_dialog;
    },
    getUserEditDialog()
    {
        return this.refs.user_edit_dialog;
    },
    onEditSuccess(newRecord){

        var newOriginalData = commons.updateObjByKey(this.state.userTable.originalData, "id", newRecord.id, newRecord);


        this.updateUserTableOriginalData(newOriginalData);

        var newData = this.userTableDataFiledsConverter(newOriginalData);

        this.updateUserTableData(newData);
    },
    onAddSuccess(newRecord){
        // c(newRecord);
        this.loadUserTableData();
    },
    onUpdateImgSuccess(result){
        this.onEditSuccess(result.data.user);

    },
    render: function () {

        const {echoData} = this.state.userEditDialog;

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
                        onClick={this.showAddDialog}
                    >
                        添加
                    </Button>
                    <Button
                        style={{marginLeft: 8}}
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
                <Table
                    locale={{emptyText: "暂无用户数据"}}
                    columns={columns}
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

                <UserEditDialog ref="user_edit_dialog"
                                echoData={echoData}
                                onEditSuccess={this.onEditSuccess}/>
                <UserAddDialog ref="user_add_dialog"
                               onAddSuccess={this.onAddSuccess}/>
                <UserImgUploaderDialog
                    ref="user_img_uploader_dialog"
                    onUpdateImgSuccess={this.onUpdateImgSuccess}/>
            </div>
        );
    }
});


export default withRouter(UserPage);   //将App组件导出
