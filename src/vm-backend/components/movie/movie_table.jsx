import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Upload, Dropdown, Popconfirm, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/movie_table.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import MovieEditDialog from "./movie_edit_dialog";
import MovieAddDialog from "./movie_add_dialog";
import ImgUploaderDialogTemplate from "../base/img_uploader_dialog_template";
import MovieVideoUploadDialog from "./movie_video_upload_dialog";
import MovieSrcVersionTable from "./movie_src_version_table";

const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var MovieTable = React.createClass({
    getInitialState: function () {

        return {
            posterUploaderDialog: {
                title: "更新电影封面",
                width: 700,
                config: {
                    aspectRatio: 1.5 / 1,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1,//2M
                    saveImgUrl: "/movie/poster",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            imgUploaderDialog: {
                title: "更新电影图片",
                width: 700,
                config: {
                    aspectRatio: 1 / 1.5,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1,//2M
                    saveImgUrl: "/movie/img",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            movieEditDialog: {
                echoData: undefined
            },
            movieTable: {
                title: "电影列表",
                scroll: {x: true, y: 450},
                dataSourceUrl: "/movie/info/list",
                delMovieUrl: "/movie/info",
                editable: false,
                haveSearchMoviename: false,
                movienameDropdownVisible: false,
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
        this.getMovieImgUploaderDialog().showDialog();
        this.getMovieImgUploaderDialog().previewImg(commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getMovieImgUploaderDialog().updateExtraInfo(record);
    },
    showMoviePosterUploaderDialog(record){
        this.getMoviePosterUploaderDialog().showDialog();
        this.getMoviePosterUploaderDialog().previewImg(commons.generateImgUrl({
            imgUrl: record.posterUrl,
            width: 600
        }));
        this.getMoviePosterUploaderDialog().updateExtraInfo(record);
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
                title: '图片',
                width: 90,
                dataIndex: 'imgUrl',
                render: (text, record) => {
                    const imageUrl = commons.generateImgUrl({
                        imgUrl: text,
                        width: 50
                    });


                    return <img onClick={() => this.showMovieImgUploaderDialog(record)} style={{
                        width: 50,
                        height: 75,
                        cursor: "pointer"
                    }} src={imageUrl} alt="暂无"/>

                }
            },
            {
                title: '播放封面',
                width: 120,
                dataIndex: 'posterUrl',
                render: (text, record) => {
                    const imageUrl = commons.generateImgUrl({
                        imgUrl: text,
                        width: 80
                    });


                    return <img onClick={() => this.showMoviePosterUploaderDialog(record)} style={{
                        width: 80,
                        height: 53,
                        cursor: "pointer"
                    }} src={imageUrl} alt="暂无"/>

                }
            },
            {
                title: '电影名',
                width: 120,
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
            // {
            //     title: '简介',
            //     width: 200,
            //     dataIndex: 'description',
            //     sorter: true,
            //     render: (text) => {
            //         return commons.makeTipSpan(text, 33);
            //     },
            // },
            {


                title: '发布时间',
                width: 100,
                dataIndex: 'release_time',
                render: (text) => {
                    return timeFormatter.formatTime(timeFormatter.int2Long(text));
                },
                sorter: true
            },
            {
                title: '评分',
                width: 80,
                dataIndex: 'score',
                sorter: true
            },
            {
                title: '观看数',
                width: 80,
                dataIndex: 'watch_num',
                sorter: true
            },
            {
                title: '时长',
                width: 80,
                dataIndex: 'movie_time',
                render: (text) => {
                    return text + " 分钟";
                },
                sorter: true
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
                                <a onClick={() => this.showMovieVideoUploadDialog(record)} href="javascript:void(0);">上传资源</a>
                            </Menu.Item>
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
                    return <div>

                        <Dropdown overlay={menu}>
                            <a href="javascript:void(0);">
                                操作 <Icon type="down"/>
                            </a>
                        </Dropdown>


                    </div>
                },
                sorter: true
            },]);
        this.loadMovieTableData();
    },
    uploadMovieSrc(record){
        c("uploadMovieSrc");
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
                posterUrl: item.posterUrl,
                name: item.name,
                alias: item.alias,
                description: item.description,
                director_id: item.directorId,
                release_time: item.releaseTime,
                score: item.score,
                watch_num: item.watchNum,
                movie_time: item.movieTime,
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
        // c(record);
        this.updateMovieEditDialogEchoData(record)

        this.getMovieEditDialog().showDialog(record);

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
    getMovieImgUploaderDialog(){
        return this.refs.movie_img_uploader_dialog;
    },
    onUpdateImgSuccess(result){

        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 300
        //     }
        // );
        // this.getMovieImgUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.movie);
    },
    onUploadTempImgSuccess(result){
        this.getMovieImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },
    //---------------------------------------------------------//
    getMoviePosterUploaderDialog(){
        return this.refs.movie_poster_uploader_dialog;
    },
    onUpdatePosterSuccess(result){
        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 200
        //     }
        // );
        // this.getMoviePosterUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.movie);
    },
    onUploadTempPosterSuccess(result){
        this.getMoviePosterUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);

    },
    expandedRowRender(record){
        return (
            <span>
                简介 ：
                <p style={{margin: 0}}>{record.description}</p>
                <MovieSrcVersionTable
                    movieId={record.id}/>
            </span>
        );
    },
    getMovieVideoUploadDialog(){
        return this.refs.movie_video_upload_dialog;
    },
    showMovieVideoUploadDialog(record){
        this.getMovieVideoUploadDialog().showDialog(record);
    },
    onMovieSrcVersionAddSuccess(record){
        window.EventsDispatcher.onMovieSrcVersionAddSuccess(record);
    },
    render: function () {

        const {echoData} = this.state.movieEditDialog;

        var {title, scroll, selectedRowKeys, columns, data, page, tableLoading, batchDeleteBtnLoading, refreshBtnLoading, bordered} = this.state.movieTable;

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

        const posterUploaderDialog = this.state.posterUploaderDialog;
        const imgUploaderDialog = this.state.imgUploaderDialog;


        const hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={()=>{
                            this.loadMovieTableData();
                            window.EventsDispatcher.loadMovieSrcVersionTableData();
                        }}
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
                    locale={{emptyText: "暂无相关电影数据"}}
                    columns={columns}
                    expandedRowRender={this.expandedRowRender}
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

                <MovieEditDialog ref="movie_edit_dialog"
                                 echoData={echoData}
                                 onEditSuccess={this.onEditSuccess}/>
                <MovieAddDialog ref="movie_add_dialog"
                                onAddSuccess={this.onAddSuccess}/>
                <ImgUploaderDialogTemplate
                    ref="movie_img_uploader_dialog"
                    config={imgUploaderDialog.config}
                    title={imgUploaderDialog.title}
                    width={imgUploaderDialog.width}
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    onUploadTempImgSuccess={this.onUploadTempImgSuccess}/>
                <ImgUploaderDialogTemplate
                    ref="movie_poster_uploader_dialog"
                    config={posterUploaderDialog.config}
                    title={posterUploaderDialog.title}
                    width={posterUploaderDialog.width}
                    onUpdateImgSuccess={this.onUpdatePosterSuccess}
                    onUploadTempImgSuccess={this.onUploadTempPosterSuccess}/>
                <MovieVideoUploadDialog
                    onMovieSrcVersionAddSuccess={this.onMovieSrcVersionAddSuccess}
                    ref="movie_video_upload_dialog"/>
            </div>
        );
    }
});


export default withRouter(MovieTable);   //将App组件导出
