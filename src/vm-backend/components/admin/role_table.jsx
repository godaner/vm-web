import React from "react";
import {Button, Dropdown, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/role/role_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import RoleEditDialog from "./role_edit_dialog";
import RoleAddDialog from "./role_add_dialog";


const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var RoleTable = React.createClass({
    getInitialState: function () {

        return {


            roleEditDialog: {
                echoData: undefined
            },
            roleTable: {
                title: "电影人列表",
                dataSourceUrl: "/role/info/list",
                delRoleUrl: "/role/info",
                scroll: {x: true, y: 450},
                editable: false,
                haveSearchRolename: false,
                rolenameDropdownVisible: false,
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
    onSearchRolename(newRolenameQuery)
    {
        this.updateNameOfQuery(newRolenameQuery);
        if (!isEmptyString(this.state.roleTable.query.username)) {
            this.updateRoleTableHaveSearchRolename(true);
        } else {

            this.updateRoleTableHaveSearchRolename(false);
        }
        this.loadRoleTableData();
    },
    updateRoleTableHaveSearchRolename(haveSearchRolename)
    {
        var state = this.state;
        state.roleTable.haveSearchRolename = haveSearchRolename;
        this.setState(state);
    },
    updateRoleTableRolenameDropdownVisible(rolenameDropdownVisible)
    {
        var state = this.state;
        state.roleTable.rolenameDropdownVisible = rolenameDropdownVisible;
        this.setState(state);
    },
    updateRoleTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.roleTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },

    removeRoleTableSelectedRowKeys(removeSelectedRowKeys)
    {
        var selectedRowKeys = this.state.roleTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateRoleTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery(name)
    {
        var state = this.state;
        state.roleTable.query.username = name;
        this.setState(state);
    },
    updateRoleTableData(data)
    {
        var state = this.state;
        state.roleTable.data = data;
        this.setState(state);
    },
    updateRoleTableBatchDeleteLoading(loading)
    {
        var state = this.state;
        state.roleTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateRoleTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.roleTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateRoleTablePage(page)
    {
        var state = this.state;
        state.roleTable.page = page;
        this.setState(state);
    },
    updateRoleTableQuery(query)
    {
        var state = this.state;
        state.roleTable.query = query;
        this.setState(state);
    },
    updateRoleTableLoading(flag)
    {
        var state = this.state;
        state.roleTable.tableLoading = flag;
        this.setState(state);
    },
    updateRoleTableColumns(columns)
    {

        var state = this.state;
        state.roleTable.columns = columns;
        this.setState(state);
    },
    updateRoleTableOriginalData(originalData){
        var state = this.state;
        state.roleTable.originalData = originalData;
        this.setState(state);
    },
    updateRoleEditDialogEchoData(echoData){
        var state = this.state;
        state.roleEditDialog.echoData = echoData;
        this.setState(state);
    },
    showRoleImgUploaderDialog(record){
        this.getRoleImgUploaderDialog().showDialog();
        this.getRoleImgUploaderDialog().previewImg(commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getRoleImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount()
    {

        this.updateRoleTableColumns([
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
                    return commons.highLight(text, this.state.roleTable.query.username);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索管理员名称"
                            onSearch={this.onSearchRolename}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: this.state.roleTable.haveSearchRolename ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.roleTable.rolenameDropdownVisible,

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
                    // c(record.immutable);
                    return <div>
                        {
                            record.immutable == 1?<div>不可操作内置对象</div>:<Dropdown overlay={menu}>
                                <a href="javascript:void(0);">
                                    操作 <Icon type="down"/>
                                </a>
                            </Dropdown>
                        }



                    </div>


                },
                sorter: true
            },]);
        this.loadRoleTableData();
    },
    uploadRoleSrc(record){
        c("uploadRoleSrc");
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.roleTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateRoleTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadRoleTableData();
    },
    roleTableDataFiledsConverter(originalData){
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
    loadRoleTableData()
    {
        this.updateRoleTableLoading(true);
        this.updateRoleTableRefreshBtnLoading(true);
        const {page, query} = this.state.roleTable;
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
            url: this.state.roleTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.roleTableDataFiledsConverter(originalData)
                //save data

                this.updateRoleTableOriginalData(originalData);

                this.updateRoleTableData(data);

                var page = this.state.roleTable.page;
                this.updateRoleTablePage({
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
                this.updateRoleTableLoading(false);
                this.updateRoleTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.roleTable.originalData, "id", record.id);

        this.updateRoleEditDialogEchoData(record)

        this.getRoleEditDialog().showDialog();

    },
    deleteRecord(ids)
    {

        const hideLoading = message.loading(deletingTip);
        this.updateRoleTableBatchDeleteLoading(true);

        const {deletingTip, delRoleUrl} = this.state.roleTable;
        ajax.delete({
            url: delRoleUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateRoleTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                message.success(result.msg);

                this.removeRoleTableSelectedRowKeys(ids);

                this.loadRoleTableData();

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
        this.getRoleAddDialog().showDialog();
    },
    getRoleAddDialog()
    {
        return this.refs.role_add_dialog;
    },
    getRoleEditDialog()
    {
        return this.refs.role_edit_dialog;
    },
    onEditSuccess(newRecord){

        var newOriginalData = commons.updateObjByKey(this.state.roleTable.originalData, "id", newRecord.id, newRecord);


        this.updateRoleTableOriginalData(newOriginalData);

        var newData = this.roleTableDataFiledsConverter(newOriginalData);

        this.updateRoleTableData(newData);
    },
    onAddSuccess(newRecord){
        // c(newRecord);
        this.loadRoleTableData();
    },
    getRoleImgUploaderDialog(){
        return this.refs.role_img_uploader_dialog;
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
    //     // this.getRoleImgUploaderDialog().previewImg(imgUrl);
    //     this.onEditSuccess(result.data.role);
    // },
    // onUploadTempImgSuccess(result){
    //     this.getRoleImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    // },

    expandedRowRender (record) {
        return <span>简介 ：<p style={{margin: 0}}>{record.description}</p></span>;
    },
    render: function () {

        const {echoData} = this.state.roleEditDialog;

        var {title, scroll, selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.roleTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // c(selectedRows);
                // var selectedRowKeys = this.state.roleTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateRoleTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                this.updateRoleTableSelectedRowKeys(selectedRowKeys);
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
                        onClick={this.loadRoleTableData}
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

                <RoleEditDialog ref="role_edit_dialog"
                                     echoData={echoData}
                                     onEditSuccess={this.onEditSuccess}/>
                <RoleAddDialog ref="role_add_dialog"
                                    onAddSuccess={this.onAddSuccess}/>
                {/*<ImgUploaderDialogTemplate*/}
                    {/*ref="role_img_uploader_dialog"*/}
                    {/*config={imgUploaderDialog.config}*/}
                    {/*title={imgUploaderDialog.title}*/}
                    {/*width={imgUploaderDialog.width}*/}
                    {/*onUpdateImgSuccess={this.onUpdateImgSuccess}*/}
                    {/*onUploadTempImgSuccess={this.onUploadTempImgSuccess}/>*/}

            </div>
        );
    }
});


export default withRouter(RoleTable);   //将App组件导出
