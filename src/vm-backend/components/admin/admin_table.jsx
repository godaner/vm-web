import React from "react";
import {Button, Dropdown, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/admin/admin_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import AdminEditDialog from "./admin_edit_dialog";
import AdminAddDialog from "./admin_add_dialog";
import AdminLoginLogsDialog from "./admin_login_logs_dialog";

const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var AdminTable = React.createClass({
    getInitialState: function () {

        return {


            adminEditDialog: {
                echoData: undefined
            },
            adminTable: {
                title: "管理员列表",
                dataSourceUrl: "/admin/info/list",
                delAdminUrl: "/admin/info",
                scroll: {x: true, y: 450},
                editable: false,
                haveSearchAdminname: false,
                adminnameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
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
                    username: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        }
    },
    showAdminLoginLogsDialog(userId){
        this.getAdminLoginLogsDialog().showDialog(userId);
    },
    getAdminLoginLogsDialog(){
        return this.refs.admin_login_logs_dialog;
    },
    onSearchAdminname(newAdminnameQuery)
    {
        this.updateNameOfQuery(newAdminnameQuery);
        if (!isEmptyString(this.state.adminTable.query.username)) {
            this.updateAdminTableHaveSearchAdminname(true);
        } else {

            this.updateAdminTableHaveSearchAdminname(false);
        }
        this.loadAdminTableData();
    },
    updateAdminTableHaveSearchAdminname(haveSearchAdminname)
    {
        var state = this.state;
        state.adminTable.haveSearchAdminname = haveSearchAdminname;
        this.setState(state);
    },
    updateAdminTableAdminnameDropdownVisible(adminnameDropdownVisible)
    {
        var state = this.state;
        state.adminTable.adminnameDropdownVisible = adminnameDropdownVisible;
        this.setState(state);
    },
    updateAdminTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.adminTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },

    removeAdminTableSelectedRowKeys(removeSelectedRowKeys)
    {
        var selectedRowKeys = this.state.adminTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateAdminTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery(name)
    {
        var state = this.state;
        state.adminTable.query.username = name;
        this.setState(state);
    },
    updateAdminTableData(data)
    {
        var state = this.state;
        state.adminTable.data = data;
        this.setState(state);
    },
    updateAdminTableBatchDeleteLoading(loading)
    {
        var state = this.state;
        state.adminTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateAdminTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.adminTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateAdminTablePage(page)
    {
        var state = this.state;
        state.adminTable.page = page;
        this.setState(state);
    },
    updateAdminTableQuery(query)
    {
        var state = this.state;
        state.adminTable.query = query;
        this.setState(state);
    },
    updateAdminTableLoading(flag)
    {
        var state = this.state;
        state.adminTable.tableLoading = flag;
        this.setState(state);
    },
    updateAdminTableColumns(columns)
    {

        var state = this.state;
        state.adminTable.columns = columns;
        this.setState(state);
    },
    updateAdminTableOriginalData(originalData){
        var state = this.state;
        state.adminTable.originalData = originalData;
        this.setState(state);
    },
    updateAdminEditDialogEchoData(echoData){
        var state = this.state;
        state.adminEditDialog.echoData = echoData;
        this.setState(state);
    },
    showAdminImgUploaderDialog(record){
        this.getAdminImgUploaderDialog().showDialog();
        this.getAdminImgUploaderDialog().previewImg(commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getAdminImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount()
    {

        this.updateAdminTableColumns([
            {
                title: 'id',
                width: 80,
                dataIndex: 'id',
                sorter: true
            },

            {
                title: '名称',
                width: 120,
                dataIndex: 'username',
                render: (text, record) => {
                    return commons.highLight(text, this.state.adminTable.query.username);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索管理员名称"
                            onSearch={this.onSearchAdminname}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: this.state.adminTable.haveSearchAdminname ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.adminTable.adminnameDropdownVisible,

            },
            {
                title: '内置对象',
                width: 100,
                dataIndex: 'immutable',
                render: (text) => {
                    return commons.getImmutableStrByIndex({index: text});
                },

            },
            {
                title: '密码',
                width: 120,
                dataIndex: 'password'

            },
            {
                title: '状态',
                width: 80,
                dataIndex: 'status',
                render: (text) => {
                    return commons.getStatusStrByIndex({index: text});
                },
                sorter: true
            },

            {
                title: '更新时间',
                width: 80,
                dataIndex: 'update_time',
                render: (text) => {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                },
                sorter: true
            },
            {
                title: '创建时间',
                width: 80,
                dataIndex: 'create_time',
                render: (text) => {

                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                },
                sorter: true
            },

            {
                title: '操作',
                dataIndex: 'operation',
                width: 80,
                render: (text, record) => {

                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <a onClick={() => this.showAdminLoginLogsDialog(record.id)} href="javascript:void(0);">查看登录日志</a>
                            </Menu.Item>
                            {
                                record.immutable == 1 ? <Menu.Item></Menu.Item>:
                                    <Menu.Item>
                                        <a onClick={() => this.showEditDialog(record)}
                                           href="javascript:void(0);">编辑</a>
                                    </Menu.Item>
                            }

                            {
                                record.immutable == 1 ? <Menu.Item></Menu.Item> :
                                    <Menu.Item>
                                        <Popconfirm title="确认删除 ? "
                                                    okText="删除"
                                                    cancelText="取消"
                                                    onConfirm={() => this.deleteRecord([record.id])}>
                                            <a href="javascript:void(0)">删除</a>
                                        </Popconfirm>
                                    </Menu.Item>
                            }

                        </Menu>
                    );
                    // c(record.immutable);
                    return <div>
                        {
                            <Dropdown overlay={menu}>
                                <a href="javascript:void(0);">
                                    操作 <Icon type="down"/>
                                </a>
                            </Dropdown>
                        }


                    </div>


                },
                sorter: true
            },]);
        this.loadAdminTableData();
    },
    uploadAdminSrc(record){
        c("uploadAdminSrc");
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.adminTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateAdminTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadAdminTableData();
    },
    adminTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: item.id,
                id: item.id,
                username: item.username,
                immutable: item.immutable,
                password: item.password,
                description: item.description,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status

            });
        }.bind(this));
        return data;
    },
    loadAdminTableData()
    {
        this.updateAdminTableLoading(true);
        this.updateAdminTableRefreshBtnLoading(true);
        const {page, query} = this.state.adminTable;
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
            url: this.state.adminTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.adminTableDataFiledsConverter(originalData)
                //save data

                this.updateAdminTableOriginalData(originalData);

                this.updateAdminTableData(data);

                var page = this.state.adminTable.page;
                this.updateAdminTablePage({
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
                this.updateAdminTableLoading(false);
                this.updateAdminTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.adminTable.originalData, "id", record.id);

        this.updateAdminEditDialogEchoData(record)

        this.getAdminEditDialog().showDialog(record);

    },
    deleteRecord(ids)
    {

        const hideLoading = message.loading(deletingTip);
        this.updateAdminTableBatchDeleteLoading(true);

        const {deletingTip, delAdminUrl} = this.state.adminTable;
        ajax.delete({
            url: delAdminUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateAdminTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                message.success(result.msg);

                this.removeAdminTableSelectedRowKeys(ids);

                this.loadAdminTableData();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            }.bind(this),
            error: function () {

            }
        });

    },
    showAddDialog()
    {
        c("showAddDialog");
        this.getAdminAddDialog().showDialog();
    },
    getAdminAddDialog()
    {
        return this.refs.admin_add_dialog;
    },
    getAdminEditDialog()
    {
        return this.refs.admin_edit_dialog;
    },
    onEditSuccess(newRecord){

        var newOriginalData = commons.updateObjByKey(this.state.adminTable.originalData, "id", newRecord.id, newRecord);


        this.updateAdminTableOriginalData(newOriginalData);

        var newData = this.adminTableDataFiledsConverter(newOriginalData);

        this.updateAdminTableData(newData);
    },
    onAddSuccess(newRecord){
        // c(newRecord);
        this.loadAdminTableData();
    },
    getAdminImgUploaderDialog(){
        return this.refs.admin_img_uploader_dialog;
    },
    // onUpdateImgSuccess(result){
    //
    //     //previewImg
    //     // const imgUrl = commons.generateImgUrl(
    //     //     {
    //     //         imgUrl: result.data.imgUrl,
    //     //         width: 300
    //     //     }
    //     // );
    //     // this.getAdminImgUploaderDialog().previewImg(imgUrl);
    //     this.onEditSuccess(result.data.admin);
    // },
    // onUploadTempImgSuccess(result){
    //     this.getAdminImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    // },

    expandedRowRender (record) {
        return <span>简介 ：<p style={{margin: 0}}>{record.description}</p></span>;
    },
    render: function () {

        const {echoData} = this.state.adminEditDialog;

        var {title, scroll, selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.adminTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // c(selectedRows);
                // var selectedRowKeys = this.state.adminTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateAdminTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                this.updateAdminTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows) => {

            },
            onSelectAll: (selected, selectedRows, changeRows) => {

            }
        };

        // const posterUploaderDialog = this.state.posterUploaderDialog;
        // const imgUploaderDialog = this.state.imgUploaderDialog;


        const hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={this.loadAdminTableData}
                    >
                        刷新
                    </Button>
                    <Button
                        style={{marginLeft: 8}}
                        type="primary"
                        onClick={this.showAddDialog}
                    >
                        添加
                    </Button>
                    <Popconfirm title="确认删除 ? "
                                okText="删除"
                                cancelText="取消"
                                onConfirm={() => this.deleteRecord(selectedRowKeys)}>
                        <Button
                            style={{marginLeft: 8}}
                            type="danger"
                            disabled={!hasSelected}
                            loading={batchDeleteBtnLoading}
                        >
                            批量删除
                        </Button>
                    </Popconfirm>


                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `选择了 ${selectedRowKeys.length} 个选项` : ''}
                    </span>
                </div>
                <Table
                    expandedRowRender={this.expandedRowRender}
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
                    title={() => title}
                    // footer={() => 'Footer'}
                    scroll={scroll}/>

                <AdminEditDialog ref="admin_edit_dialog"
                                 echoData={echoData}
                                 onEditSuccess={this.onEditSuccess}/>
                <AdminAddDialog ref="admin_add_dialog"
                                onAddSuccess={this.onAddSuccess}/>

                <AdminLoginLogsDialog
                    ref="admin_login_logs_dialog"/>
            </div>
        );
    }
});


export default withRouter(AdminTable);   //将App组件导出
