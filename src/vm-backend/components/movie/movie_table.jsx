import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/movie_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import MovieEditDialog from "./movie_edit_dialog";
import MovieAddDialog from "./movie_add_dialog";
import MovieImgUploaderDialog from "./movie_img_uploader_dialog";

const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var MovieTable = React.createClass({
    getInitialState: function () {

        return {
            movieEditDialog: {
                echoData: undefined
            },
            movieTable: {
                dataSourceUrl: "/movie/info/list",
                delMovieUrl: "/movie/info",
                editable: false,
                haveSearchMoviename: false,
                movienameDropdownVisible: false,
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
    onSearchMoviename(newMovienameQuery)
    {
        this.updateNameOfQuery(newMovienameQuery);
        if (!isEmptyString(this.state.movieTable.query.name)) {
            this.updateMovieTableHaveSearchMoviename(true);
        } else {

            this.updateMovieTableHaveSearchMoviename(false);
        }
        this.loadMovieTableData();
    },
    updateMovieTableHaveSearchMoviename(haveSearchMoviename)
    {
        var state = this.state;
        state.movieTable.haveSearchMoviename = haveSearchMoviename;
        this.setState(state);
    },
    updateMovieTableMovienameDropdownVisible(movienameDropdownVisible)
    {
        var state = this.state;
        state.movieTable.movienameDropdownVisible = movienameDropdownVisible;
        this.setState(state);
    },
    updateMovieTableSelectedRowKeys(selectedRowKeys)
    {
        var state = this.state;
        state.movieTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },

    removeMovieTableSelectedRowKeys(removeSelectedRowKeys)
    {
        var selectedRowKeys = this.state.movieTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateMovieTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery(name)
    {
        var state = this.state;
        state.movieTable.query.name = name;
        this.setState(state);
    },
    updateMovieTableData(data)
    {
        var state = this.state;
        state.movieTable.data = data;
        this.setState(state);
    },
    updateMovieTableBatchDeleteLoading(loading)
    {
        var state = this.state;
        state.movieTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateMovieTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.movieTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateMovieTablePage(page)
    {
        var state = this.state;
        state.movieTable.page = page;
        this.setState(state);
    },
    updateMovieTableQuery(query)
    {
        var state = this.state;
        state.movieTable.query = query;
        this.setState(state);
    },
    updateMovieTableLoading(flag)
    {
        var state = this.state;
        state.movieTable.tableLoading = flag;
        this.setState(state);
    },
    updateMovieTableColumns(columns)
    {

        var state = this.state;
        state.movieTable.columns = columns;
        this.setState(state);
    },
    updateMovieTableOriginalData(originalData){
        var state = this.state;
        state.movieTable.originalData = originalData;
        this.setState(state);
    },
    updateMovieEditDialogEchoData(echoData){
        var state = this.state;
        state.movieEditDialog.echoData = echoData;
        this.setState(state);
    },
    showMovieImgUploaderDialog(record){
        this.refs.movie_img_uploader_dialog.showDialog(record);
    },
    closeMovieImgUploaderDialog(){
        this.refs.movie_img_uploader_dialog.closeDialog();
    },
    componentDidMount()
    {

        this.updateMovieTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '封面',
                width: 100,
                dataIndex: 'imgUrl',
                render: (text, record) => {
                    const imageUrl = commons.addUrlParam({
                        url: vm_config.http_url_prefix + text,
                        obj: {
                            width: "50"
                        }
                    });
                    c(record);


                    return <img onClick={() => this.showMovieImgUploaderDialog(record)} style={{
                        width: 50,
                        height: 75,
                        cursor: "pointer"
                    }} src={imageUrl} alt=""/>

                }
            },
            {
                title: '播放封面',
                width: 100,
                dataIndex: 'postUrl',
                render: (text, record) => {
                    const imageUrl = commons.addUrlParam({
                        url: vm_config.http_url_prefix + text,
                        obj: {
                            width: "50"
                        }
                    });


                    return <img onClick={() => this.showMovieImgUploaderDialog(record)} style={{
                        width: 50,
                        height: 50,
                        cursor: "pointer"
                    }} src={imageUrl} alt=""/>

                }
            },
            {
                title: '电影名',
                width: 150,
                dataIndex: 'name',
                render: (text, record) => {
                    return commons.highLight(text, this.state.movieTable.query.name);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索电影名"
                            onSearch={this.onSearchMoviename}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: this.state.movieTable.haveSearchMoviename ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.movieTable.movienameDropdownVisible,

            },


            {
                title: '别名',
                width: 100,
                dataIndex: 'alias',
                sorter: true


            },
            {
                title: '简介',
                width: 200,
                dataIndex: 'description',
                sorter: true,
                render: (text) => {
                    return commons.makeTipSpan(text, 33);
                },
            },
            {


                title: '发布时间',
                width: 100,
                dataIndex: 'release_time',
                render: (text) => {
                    return timeFormatter.formatDate(text * 1000);
                },
                sorter: true
            },
            {
                title: '评分',
                width: 100,
                dataIndex: 'score',
                sorter: true
            },
            {
                title: '观看数',
                width: 150,
                dataIndex: 'watch_num',
                sorter: true
            },
            {
                title: '电影时长',
                width: 150,
                dataIndex: 'movie_time',
                render: (text) => {
                    return text + " 分钟";
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
                title: '最后更新时间',
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
                width: 150,
                render: (text, record) => {
                    return <div>
                        <a onClick={() => this.showMovieLoginLogsDialog(record.id)} href="javascript:void(0);">登录日志</a>
                        &nbsp;&nbsp;
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
        this.loadMovieTableData();
    },
    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.movieTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateMovieTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadMovieTableData();
    },
    movieTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                name: item.name,
                alias: item.alias,
                description: item.description,
                director_id: item.directorId,
                release_time: item.releaseTime,
                score: item.score,
                watch_num: item.watchNum,
                movie_time: item.movieTime,
                posterUrl: item.posterUrl,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status
            });
        }.bind(this));
        return data;
    },
    loadMovieTableData()
    {
        this.updateMovieTableLoading(true);
        this.updateMovieTableRefreshBtnLoading(true);
        const {page, query} = this.state.movieTable;
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
            url: this.state.movieTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.movieTableDataFiledsConverter(originalData)
                //save data

                this.updateMovieTableOriginalData(originalData);

                this.updateMovieTableData(data);

                var page = this.state.movieTable.page;
                this.updateMovieTablePage({
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
                this.updateMovieTableLoading(false);
                this.updateMovieTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog(record)
    {
        record = commons.getObjByKey(this.state.movieTable.originalData, "id", record.id);
        c(record);
        this.updateMovieEditDialogEchoData(record)

        this.getMovieEditDialog().showDialog();

    },
    deleteRecord(ids)
    {

        const hideLoading = message.loading(deletingTip);
        this.updateMovieTableBatchDeleteLoading(true);

        const {deletingTip, delMovieUrl} = this.state.movieTable;
        ajax.delete({
            url: delMovieUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateMovieTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                message.success(result.msg);

                this.removeMovieTableSelectedRowKeys(ids);

                this.loadMovieTableData();

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
        this.getMovieAddDialog().showDialog();
    },
    getMovieAddDialog()
    {
        return this.refs.movie_add_dialog;
    },
    getMovieEditDialog()
    {
        return this.refs.movie_edit_dialog;
    },
    onEditSuccess(newRecord){

        var newOriginalData = commons.updateObjByKey(this.state.movieTable.originalData, "id", newRecord.id, newRecord);


        this.updateMovieTableOriginalData(newOriginalData);

        var newData = this.movieTableDataFiledsConverter(newOriginalData);

        this.updateMovieTableData(newData);
    },
    onAddSuccess(newRecord){
        // c(newRecord);
        this.loadMovieTableData();
    },
    onUpdateImgSuccess(result){
        this.onEditSuccess(result.data.movie);
        this.closeMovieImgUploaderDialog();
    },
    render: function () {

        const {echoData} = this.state.movieEditDialog;

        var {selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.movieTable;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // c(selectedRows);
                // var selectedRowKeys = this.state.movieTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateMovieTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                this.updateMovieTableSelectedRowKeys(selectedRowKeys);
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
                        onClick={this.loadMovieTableData}
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

                <MovieEditDialog ref="movie_edit_dialog"
                                 echoData={echoData}
                                 onEditSuccess={this.onEditSuccess}/>
                <MovieAddDialog ref="movie_add_dialog"
                                onAddSuccess={this.onAddSuccess}/>
                <MovieImgUploaderDialog
                    ref="movie_img_uploader_dialog"
                    onUpdateImgSuccess={this.onUpdateImgSuccess}/>
            </div>
        );
    }
});


export default withRouter(MovieTable);   //将App组件导出
