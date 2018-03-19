import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/filmmaker_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import FilmmakerEditDialog from "./filmmaker_edit_dialog";
import FilmmakerAddDialog from "./filmmaker_add_dialog";
import ImgUploaderDialogTemplate from "../base/img_uploader_dialog_template";

const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var FilmmakerTable = React.createClass({
    getInitialState: function () {

        return {

            imgUploaderDialog:{
                title: "更新电影人图片",
                width: 700,
                config: {
                    aspectRatio:1/1,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1,//2M
                    saveImgUrl: "/filmmaker/img",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            filmmakerEditDialog: {
                echoData: undefined
            },
            filmmakerTable: {
                dataSourceUrl: "/filmmaker/info/list",
                delFilmmakerUrl: "/filmmaker/info",
                editable: false,
                haveSearchFilmmakername: false,
                filmmakernameDropdownVisible: false,
                bordered: true,
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
    onSearchFilmmakername(newFilmmakernameQuery)
    {
        this.updateNameOfQuery(newFilmmakernameQuery);
        if (!isEmptyString(this.state.filmmakerTable.query.name)) {
            this.updateFilmmakerTableHaveSearchFilmmakername(true);
        } else {

            this.updateFilmmakerTableHaveSearchFilmmakername(false);
        }
        this.loadFilmmakerTableData();
    },
    updateFilmmakerTableHaveSearchFilmmakername(haveSearchFilmmakername)
    {
        var state = this.state;
        state.filmmakerTable.haveSearchFilmmakername = haveSearchFilmmakername;
        this.setState(state);
    },
    updateFilmmakerTableFilmmakernameDropdownVisible(filmmakernameDropdownVisible)
    {
        var state = this.state;
        state.filmmakerTable.filmmakernameDropdownVisible = filmmakernameDropdownVisible;
        this.setState(state);
    },
    updateFilmmakerTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.filmmakerTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },

    removeFilmmakerTableSelectedRowKeys(removeSelectedRowKeys)
    {
        var selectedRowKeys = this.state.filmmakerTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery(name)
    {
        var state = this.state;
        state.filmmakerTable.query.name = name;
        this.setState(state);
    },
    updateFilmmakerTableData(data)
    {
        var state = this.state;
        state.filmmakerTable.data = data;
        this.setState(state);
    },
    updateFilmmakerTableBatchDeleteLoading(loading)
    {
        var state = this.state;
        state.filmmakerTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateFilmmakerTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.filmmakerTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateFilmmakerTablePage(page)
    {
        var state = this.state;
        state.filmmakerTable.page = page;
        this.setState(state);
    },
    updateFilmmakerTableQuery(query)
    {
        var state = this.state;
        state.filmmakerTable.query = query;
        this.setState(state);
    },
    updateFilmmakerTableLoading(flag)
    {
        var state = this.state;
        state.filmmakerTable.tableLoading = flag;
        this.setState(state);
    },
    updateFilmmakerTableColumns(columns)
    {

        var state = this.state;
        state.filmmakerTable.columns = columns;
        this.setState(state);
    },
    updateFilmmakerTableOriginalData(originalData){
        var state = this.state;
        state.filmmakerTable.originalData = originalData;
        this.setState(state);
    },
    updateFilmmakerEditDialogEchoData(echoData){
        var state = this.state;
        state.filmmakerEditDialog.echoData = echoData;
        this.setState(state);
    },
    showFilmmakerImgUploaderDialog(record){
        this.getFilmmakerImgUploaderDialog().showDialog();
        this.getFilmmakerImgUploaderDialog().previewImg(commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getFilmmakerImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount()
    {

        this.updateFilmmakerTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '图片',
                width: 90,
                dataIndex: 'imgUrl',
                render: (text, record) => {
                    const imageUrl = commons.generateImgUrl({
                        imgUrl: text,
                        width: 50
                    });


                    return <img onClick={() => this.showFilmmakerImgUploaderDialog(record)} style={{
                        width: 50,
                        height: 75,
                        cursor: "pointer"
                    }} src={imageUrl} alt="暂无"/>

                }
            },

            {
                title: '名称',
                width: 120,
                dataIndex: 'name',
                render: (text, record) => {
                    return commons.highLight(text, this.state.filmmakerTable.query.name);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索电影名"
                            onSearch={this.onSearchFilmmakername}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: this.state.filmmakerTable.haveSearchFilmmakername ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.filmmakerTable.filmmakernameDropdownVisible,

            },


            {
                title: '别名',
                width: 100,
                dataIndex: 'alias',
                sorter: true


            },

            {
                title: '国家',
                width: 100,
                dataIndex: 'country',
                sorter: true
            },

            {
                title: '职业',
                width: 100,
                dataIndex: 'profession',
                sorter: true,
                render: (text) => {
                    return commons.makeTipSpan(text, 10);
                },
            },

            {
                title: '血型',
                width: 100,
                dataIndex: 'bloodType',
                sorter: true
            },

            {
                title: '星座',
                width: 100,
                dataIndex: 'constellation',
                sorter: true
            },

            {
                title: '生日',
                width: 100,
                dataIndex: 'birthday',
                sorter: true
            },

            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                sorter: true
            },

            {
                title: '简介',
                width: 150,
                dataIndex: 'description',
                sorter: true,
                render: (text) => {
                    return commons.makeTipSpan(text, 19);
                },
            },
            {
                title: '评分',
                width: 80,
                dataIndex: 'score',
                sorter: true
            },
            {
                title: '状态',
                width: 80,
                dataIndex: 'status',
                render: (text) => {
                    return text == 1 ? "正常" : text == 2 ? "冻结" : text;
                },
                sorter: true
            },

            {
                title: '更新时间',
                width: 100,
                dataIndex: 'update_time',
                render: (text) => {
                    return timeFormatter.formatDate(text * 1000);
                },
                sorter: true
            },
            {
                title: '创建时间',
                width: 100,
                dataIndex: 'create_time',
                render: (text) => {
                    return timeFormatter.formatDate(text * 1000);
                },
                sorter: true
            },

            {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
                render: (text, record) => {
                    return <div>

                        <a onClick={() => this.showEditDialog(record)} href="javascript:void(0);">编辑</a>
                        &nbsp;&nbsp;
                        <Popconfirm title="确认删除 ? "
                                    okText="删除"
                                    cancelText="取消"
                                    onConfirm={() => this.deleteRecord([record.id])}>
                            <a href="javascript:void(0)">删除</a>
                        </Popconfirm>


                    </div>
                },
                sorter: true
            },]);
        this.loadFilmmakerTableData();
    },
    uploadFilmmakerSrc(record){
      c("uploadFilmmakerSrc");
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.filmmakerTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateFilmmakerTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadFilmmakerTableData();
    },
    filmmakerTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                name: item.name,
                alias: item.alias,
                description: item.description,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status,
                profession: item.profession,
                bloodType: item.bloodType,
                constellation: item.constellation,
                sex: item.sex,
                country: item.country,
                birthday: item.birthday,

            });
        }.bind(this));
        return data;
    },
    loadFilmmakerTableData()
    {
        this.updateFilmmakerTableLoading(true);
        this.updateFilmmakerTableRefreshBtnLoading(true);
        const {page, query} = this.state.filmmakerTable;
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
            url: this.state.filmmakerTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.filmmakerTableDataFiledsConverter(originalData)
                //save data

                this.updateFilmmakerTableOriginalData(originalData);

                this.updateFilmmakerTableData(data);

                var page = this.state.filmmakerTable.page;
                this.updateFilmmakerTablePage({
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
                this.updateFilmmakerTableLoading(false);
                this.updateFilmmakerTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.filmmakerTable.originalData, "id", record.id);
        c(record);
        this.updateFilmmakerEditDialogEchoData(record)

        this.getFilmmakerEditDialog().showDialog();

    },
    deleteRecord(ids)
    {

        const hideLoading = message.loading(deletingTip);
        this.updateFilmmakerTableBatchDeleteLoading(true);

        const {deletingTip, delFilmmakerUrl} = this.state.filmmakerTable;
        ajax.delete({
            url: delFilmmakerUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateFilmmakerTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                message.success(result.msg);

                this.removeFilmmakerTableSelectedRowKeys(ids);

                this.loadFilmmakerTableData();

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
        this.getFilmmakerAddDialog().showDialog();
    },
    getFilmmakerAddDialog()
    {
        return this.refs.filmmaker_add_dialog;
    },
    getFilmmakerEditDialog()
    {
        return this.refs.filmmaker_edit_dialog;
    },
    onEditSuccess(newRecord){

        var newOriginalData = commons.updateObjByKey(this.state.filmmakerTable.originalData, "id", newRecord.id, newRecord);


        this.updateFilmmakerTableOriginalData(newOriginalData);

        var newData = this.filmmakerTableDataFiledsConverter(newOriginalData);

        this.updateFilmmakerTableData(newData);
    },
    onAddSuccess(newRecord){
        // c(newRecord);
        this.loadFilmmakerTableData();
    },
    getFilmmakerImgUploaderDialog(){
        return this.refs.filmmaker_img_uploader_dialog;
    },
    onUpdateImgSuccess(result){

        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 300
        //     }
        // );
        // this.getFilmmakerImgUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.filmmaker);
    },
    onUploadTempImgSuccess(result){
        this.getFilmmakerImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },

    render: function () {

        const {echoData} = this.state.filmmakerEditDialog;

        var {selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.filmmakerTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // c(selectedRows);
                // var selectedRowKeys = this.state.filmmakerTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                this.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows) => {

            },
            onSelectAll: (selected, selectedRows, changeRows) => {

            }
        };

        const posterUploaderDialog = this.state.posterUploaderDialog;
        const imgUploaderDialog = this.state.imgUploaderDialog;


        const hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={this.loadFilmmakerTableData}
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

                <FilmmakerEditDialog ref="filmmaker_edit_dialog"
                                 echoData={echoData}
                                 onEditSuccess={this.onEditSuccess}/>
                <FilmmakerAddDialog ref="filmmaker_add_dialog"
                                onAddSuccess={this.onAddSuccess}/>
                <ImgUploaderDialogTemplate
                    ref="filmmaker_img_uploader_dialog"
                    config={imgUploaderDialog.config}
                    title={imgUploaderDialog.title}
                    width={imgUploaderDialog.width}
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    onUploadTempImgSuccess={this.onUploadTempImgSuccess}/>

            </div>
        );
    }
});


export default withRouter(FilmmakerTable);   //将App组件导出
