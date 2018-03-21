import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Dropdown, Badge} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/tagGroup_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import TagTable from "./tag_table";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var TagGroupTable = React.createClass({
    getInitialState: function () {

        return {


            tagGroupTable: {
                dataSourceUrl: "/tagGroup/info/list",
                delTagGroupUrl: "/tagGroup/info",
                editable: false,
                haveSearchTagGroupname: false,
                tagGroupnameDropdownVisible: false,
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
                    name: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        }
    },
    onSearchTagGroupname(newTagGroupnameQuery)
    {
        this.updateNameOfQuery(newTagGroupnameQuery);
        if (!isEmptyString(this.state.tagGroupTable.query.name)) {
            this.updateTagGroupTableHaveSearchTagGroupname(true);
        } else {

            this.updateTagGroupTableHaveSearchTagGroupname(false);
        }
        this.loadTagGroupTableData();
    },
    updateTagGroupTableHaveSearchTagGroupname(haveSearchTagGroupname)
    {
        var state = this.state;
        state.tagGroupTable.haveSearchTagGroupname = haveSearchTagGroupname;
        this.setState(state);
    },
    updateTagGroupTableTagGroupnameDropdownVisible(tagGroupnameDropdownVisible)
    {
        var state = this.state;
        state.tagGroupTable.tagGroupnameDropdownVisible = tagGroupnameDropdownVisible;
        this.setState(state);
    },
    updateTagGroupTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.tagGroupTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },

    removeTagGroupTableSelectedRowKeys(removeSelectedRowKeys)
    {
        var selectedRowKeys = this.state.tagGroupTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery(name)
    {
        var state = this.state;
        state.tagGroupTable.query.name = name;
        this.setState(state);
    },
    updateTagGroupTableData(data)
    {
        var state = this.state;
        state.tagGroupTable.data = data;
        this.setState(state);
    },
    updateTagGroupTableBatchDeleteLoading(loading)
    {
        var state = this.state;
        state.tagGroupTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateTagGroupTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.tagGroupTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateTagGroupTablePage(page)
    {
        var state = this.state;
        state.tagGroupTable.page = page;
        this.setState(state);
    },
    updateTagGroupTableQuery(query)
    {
        var state = this.state;
        state.tagGroupTable.query = query;
        this.setState(state);
    },
    updateTagGroupTableLoading(flag)
    {
        var state = this.state;
        state.tagGroupTable.tableLoading = flag;
        this.setState(state);
    },
    updateTagGroupTableColumns(columns)
    {

        var state = this.state;
        state.tagGroupTable.columns = columns;
        this.setState(state);
    },
    updateTagGroupTableOriginalData(originalData){
        var state = this.state;
        state.tagGroupTable.originalData = originalData;
        this.setState(state);
    },

    componentDidMount()
    {

        this.updateTagGroupTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '名称',
                width: 90,
                dataIndex: 'name',

            },
            {
                title: '状态',
                width: 80,
                dataIndex: 'status',
                render: (text) => {
                    return commons.getStatusStrByIndex({index: text})
                },
                sorter: true
            },

            {
                title: '更新时间',
                width: 100,
                dataIndex: 'update_time',
                render: (text) => {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                },
                sorter: true
            },
            {
                title: '创建时间',
                width: 100,
                dataIndex: 'create_time',
                render: (text) => {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                },
                sorter: true
            },

            {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
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
                sorter: true
            },]);
        this.loadTagGroupTableData();
    },
    uploadTagGroupSrc(record){
        c("uploadTagGroupSrc");
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.tagGroupTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateTagGroupTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadTagGroupTableData();
    },
    tagGroupTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: item.id,
                id: item.id,
                name: item.name,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status
            });
        }.bind(this));
        return data;
    },
    loadTagGroupTableData()
    {
        this.updateTagGroupTableLoading(true);
        this.updateTagGroupTableRefreshBtnLoading(true);
        const {page, query} = this.state.tagGroupTable;
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
            url: this.state.tagGroupTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.tagGroupTableDataFiledsConverter(originalData)
                //save data

                this.updateTagGroupTableOriginalData(originalData);

                this.updateTagGroupTableData(data);

                var page = this.state.tagGroupTable.page;
                this.updateTagGroupTablePage({
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
                this.updateTagGroupTableLoading(false);
                this.updateTagGroupTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.tagGroupTable.originalData, "id", record.id);
        // c(record);
        this.updateTagGroupEditDialogEchoData(record)

        this.getTagGroupEditDialog().showDialog(record);

    },
    deleteRecord(ids)
    {

        const hideLoading = message.loading(deletingTip);
        this.updateTagGroupTableBatchDeleteLoading(true);

        const {deletingTip, delTagGroupUrl} = this.state.tagGroupTable;
        ajax.delete({
            url: delTagGroupUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateTagGroupTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                message.success(result.msg);

                this.removeTagGroupTableSelectedRowKeys(ids);

                this.loadTagGroupTableData();

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
        this.getTagGroupAddDialog().showDialog();
    },
    getTagGroupAddDialog()
    {
        return this.refs.tagGroup_add_dialog;
    },
    getTagGroupEditDialog()
    {
        return this.refs.tagGroup_edit_dialog;
    },
    expandedRowRender(record){

        return (
            <TagTable
                tagGroupId={record.id}
            />
        );
    },

    render: function () {


        var {selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.tagGroupTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // c(selectedRows);
                // var selectedRowKeys = this.state.tagGroupTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                this.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows) => {

            },
            onSelectAll: (selected, selectedRows, changeRows) => {

            }
        };


        const hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={this.loadTagGroupTableData}
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
                    className="components-table-demo-nested"
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
                    title={() => '用户列表'}
                    // footer={() => 'Footer'}
                    scroll={{x: "100%", y: "100%"}}/>


            </div>
        );
    }
});


export default withRouter(TagGroupTable);   //将App组件导出
